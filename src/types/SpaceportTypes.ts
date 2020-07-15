interface SpaceportConfig {
  name?: string;
  pool?: number;
}

interface WorkerLifecycle {
  workerDidSpawn?: (hook: () => void) => void;
  workerReceivedMessage?: (hook: () => void) => void;
  workerWillExecute?: (hook: () => void) => void;
  workerDidExecute?: (hook: () => void) => void;
  workerWillTerminate?: (hook: () => void) => void;
}

interface WorkerConfig {
  label: string;
  poolingPriority?: number;
  terminate?: boolean;
  terminationRuns?: boolean;
  url: string;
}

interface WorkerLocations {
  [key: string]: WorkerConfig;
}

interface Spaceport {
  debug?: boolean;
  config?: SpaceportConfig;
  workerLocations: Array<WorkerLocations>;
}

export {
  SpaceportConfig,
  Spaceport,
  WorkerConfig,
  WorkerLocations,
  WorkerLifecycle,
};
