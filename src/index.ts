import express from "express";
import axios, { AxiosRequestConfig } from "axios";
import cron from "node-cron";
import {
  registry,
  cpuUsedGauge,
  creepsGauge,
  energyGauge,
  storageGauge,
  gclLevelGauge,
  terminalGauge,
  cpuLimitGauge,
  mineralsGauge,
  cpuBucketGauge,
  gclProgressGauge,
  energyCapacityGauge,
  controllerLevelGauge,
  gclProgressTotalGauge,
  controllerProgressGauge,
} from "./gauge";

const port = 3000;
const app = express();

const SEGMENT = 0;
const SHARD = "shard3";
const SCREEPS_TOKEN = process.env.SCREEPS_TOKEN;
const SCREEPS_API_URL =
  process.env.SCREEPS_API_URL || "https://screeps.com/api";

if (!SCREEPS_TOKEN) {
  console.error("SCREEPS_TOKEN is not set");
  process.exit(1);
}

async function fetchMemorySegment(): Promise<void> {
  try {
    const params: AxiosRequestConfig = {
      params: { segment: SEGMENT, shard: SHARD },
      headers: {
        Accept: "application/json",
        "X-token": SCREEPS_TOKEN,
      },
    };

    const response = await axios.get(
      `${SCREEPS_API_URL}/user/memory-segment`,
      params,
    );

    if (response.data.ok && response.data.data) {
      const stats = JSON.parse(response.data.data);
      console.log("stats:", stats);
      updateMetrics(stats);
    } else {
      console.error("Failed to fetch memory segment:", response.data);
    }
  } catch (error) {
    console.error("Error fetching memory segment:", error);
  }
}

function updateMetrics(stats: GameStats): void {
  for (const [roomName, roomStats] of Object.entries(stats.rooms)) {
    energyGauge.set({ room: roomName }, roomStats.energy);
    creepsGauge.set({ room: roomName }, roomStats.creeps);
    storageGauge.set({ room: roomName }, roomStats.storageEnergy);
    terminalGauge.set({ room: roomName }, roomStats.terminalEnergy);
    energyCapacityGauge.set(
      { room: roomName },
      roomStats.energyCapacityAvailable,
    );

    if (roomStats.controllerLevel !== undefined) {
      controllerLevelGauge.set({ room: roomName }, roomStats.controllerLevel);
    }

    if (roomStats.controllerProgress !== undefined) {
      controllerProgressGauge.set(
        { room: roomName },
        roomStats.controllerProgress,
      );
    }

    for (const [mineralType, amount] of Object.entries(roomStats.minerals)) {
      mineralsGauge.set({ room: roomName, mineral_type: mineralType }, amount);
    }
  }

  cpuBucketGauge.set(stats.cpu.bucket);
  cpuLimitGauge.set(stats.cpu.limit);
  cpuUsedGauge.set(stats.cpu.used);

  gclProgressGauge.set(stats.gcl.progress);
  gclLevelGauge.set(stats.gcl.level);
  gclProgressTotalGauge.set(stats.gcl.progressTotal);
}

cron.schedule("*/5 * * * *", () => {
  console.log("Fetching memory segment...");
  fetchMemorySegment();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", registry.contentType);
  res.end(await registry.metrics());
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  fetchMemorySegment();
});
