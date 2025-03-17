import { Registry, Gauge } from "prom-client";

export const registry = new Registry();
export const energyGauge = new Gauge({
  name: "screeps_energy",
  help: "Current energy in the room",
  labelNames: ["room"],
  registers: [registry],
});

export const mineralsGauge = new Gauge({
  name: "screeps_minerals",
  help: "Current minerals in the room",
  labelNames: ["room", "mineral_type"],
  registers: [registry],
});

export const controllerProgressGauge = new Gauge({
  name: "screeps_controller_progress",
  help: "Controller progress in the room",
  labelNames: ["room"],
  registers: [registry],
});
export const creepsGauge = new Gauge({
  name: "screeps_creeps",
  help: "Number of creeps in the room",
  labelNames: ["room"],
  registers: [registry],
});
export const storageGauge = new Gauge({
  name: "screeps_storage_energy",
  help: "Energy in storage",
  labelNames: ["room"],
  registers: [registry],
});

export const terminalGauge = new Gauge({
  name: "screeps_terminal_energy",
  help: "Energy in terminal",
  labelNames: ["room"],
  registers: [registry],
});

export const energyCapacityGauge = new Gauge({
  name: "screeps_energy_capacity",
  help: "Total energy capacity available",
  labelNames: ["room"],
  registers: [registry],
});

export const controllerLevelGauge = new Gauge({
  name: "screeps_controller_level",
  help: "Room controller level",
  labelNames: ["room"],
  registers: [registry],
});
export const cpuBucketGauge = new Gauge({
  name: "screeps_cpu_bucket",
  help: "Current CPU bucket balance",
  registers: [registry],
});

export const cpuLimitGauge = new Gauge({
  name: "screeps_cpu_limit",
  help: "CPU limit allocated for the current shard",
  registers: [registry],
});

export const cpuUsedGauge = new Gauge({
  name: "screeps_cpu_used",
  help: "CPU usage in current tick",
  registers: [registry],
});

export const gclProgressGauge = new Gauge({
  name: "screeps_gcl_progress",
  help: "Current GCL progress points",
  registers: [registry],
});

export const gclLevelGauge = new Gauge({
  name: "screeps_gcl_level",
  help: "Global Control Level (GCL)",
  registers: [registry],
});

export const gclProgressTotalGauge = new Gauge({
  name: "screeps_gcl_progress_total",
  help: "Total progress needed for next GCL level",
  registers: [registry],
});
