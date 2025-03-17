// in loop function
if (Game.time % 10 === 0) {
  updateStats();
}

function updateStats() {
  const stats: GameStats = {
    gcl: {
      progress: Game.gcl.progress,
      progressTotal: Game.gcl.progressTotal,
      level: Game.gcl.level,
    },
    cpu: {
      bucket: Game.cpu.bucket,
      limit: Game.cpu.limit,
      used: Game.cpu.getUsed(),
    },
    rooms: {},
  };

  for (const roomName of Object.keys(Game.rooms)) {
    const room = Game.rooms[roomName];
    if (room.controller?.my == false) continue;

    stats.rooms[roomName] = {
      energy: room.energyAvailable,
      minerals: {},
      controllerProgress: room.controller ? room.controller.progress : 0,
      creeps: Object.keys(Game.creeps).filter(
        (creep) => Game.creeps[creep].room.name === roomName,
      ).length,
      storageEnergy: room.storage ? room.storage.store.energy : 0,
      terminalEnergy: room.terminal ? room.terminal.store.energy : 0,
      energyAvailable: room.energyAvailable,
      energyCapacityAvailable: room.energyCapacityAvailable,
      controllerProgressTotal: room.controller?.progressTotal,
      controllerLevel: room.controller?.level,
    };
  }

  RawMemory.setActiveSegments([0]);
  RawMemory.segments[0] = JSON.stringify(stats);
}
