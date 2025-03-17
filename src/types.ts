interface RoomStats {
  energy: number;
  minerals: { [type: string]: number };
  controllerProgress?: number;
  creeps: number;
  storageEnergy: number;
  terminalEnergy: number;
  energyAvailable: number;
  energyCapacityAvailable: number;
  controllerProgressTotal?: number;
  controllerLevel?: number;
}

interface GCLStats {
  progress: number;
  progressTotal: number;
  level: number;
}

interface CPUStats {
  bucket: number;
  limit: number;
  used: number;
}

interface GameStats {
  gcl: GCLStats;
  rooms: { [roomName: string]: RoomStats };
  cpu: CPUStats;
}
