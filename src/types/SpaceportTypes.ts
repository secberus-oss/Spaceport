import debounce from 'lodash/debounce';
enum PrebuildOptions {
  none = 'NONE',
  http = 'HTTP',
  filtering = 'FILTERING',
  sorting = 'SORTING',
}

type WorkerCallback = (arg0: MessageEvent<any>, ...rest: any[]) => any;

interface PrebuildConfig {
  usePrebuilt?: boolean;
  prebuiltOption?: PrebuildOptions;
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
  onmessageCallback?: WorkerCallback | null;
}

interface WorkerLocations {
  [key: string]: WorkerConfig;
}

interface Spaceport {
  debug?: boolean;
  config?: SpaceportConfig;
  workerLocations: Array<WorkerLocations>;
}

interface WorkerMethodsAndProperties {
  onmessage: () => unknown;
  onmessageerror: () => void;
  rejectionhandled: () => void;
  messageerror: () => void;
  unhandledrejection: () => void;
  message: () => void;
}

interface rcConfig {
  modules?: boolean;
  outputPath?: string;
  retainParentFolderStructure?: boolean;
  inputPath?: Array<string> | string;
}

interface WorkerBuilder {
  prebuildOptions?: PrebuildConfig;
  lifecycleHooks: WorkerLifecycle;
  methods: WorkerMethodsAndProperties;
}

interface BuiltWorker {
  hooks: WorkerLifecycle;
  content: WorkerMethodsAndProperties;
}

interface AggregatorConfig {
  aggregate: boolean;
  callback: Array<() => any>; // eslint-disable-line
  callbackTimeout: number;
}

interface SpaceportConfig {
  name?: string;
  pool?: number;
  useAggregator?: AggregatorConfig;
}

type Callback = ({
  data,
  postmessagePayload,
  ...rest
}: Record<string, unknown>) => unknown;

type DebounceType = ReturnType<typeof debounce>;

export interface WorkerStorage {
  workerArray: Array<Worker | never>;
  url: string;
  poolingPriority?: number;
  terminate?: boolean;
  terminationRuns?: boolean | number;
  onmessageCallback?: WorkerCallback | null;
  postmessagePayload?: Record<string, unknown>;
  aggregativeCallback?: WorkerCallback | null;
}

export interface BayConfig {
  workerContent: WorkerConfig | Array<WorkerConfig>;
  name: string;
  headers?: Record<string, unknown>;
  useAggregator?: boolean;
  promisify?: boolean;
  timeout?: number;
  aggregatorTimeout?: number;
  postmessagePayload?: Record<string, unknown>;
  aggregativeCallback?: Callback | null;
  onmessageCallback: WorkerCallback;
}
export interface PromiseStorageAttr {
  promise: Promise<boolean> | null;
  resolvePromise: ((didResolveInTime: boolean) => void) | null;
}
export interface PromiseStorage {
  [key: string]: PromiseStorageAttr;
}

export interface SpaceportInternals {
  current: number;
  promiseKey: string;
  [key: string]: unknown; //extensible
}

export interface WithSpaceportInternals {
  spaceportInternals: SpaceportInternals;
}

export {
  SpaceportConfig,
  Spaceport,
  WorkerConfig,
  WorkerLocations,
  WorkerLifecycle,
  WorkerMethodsAndProperties,
  BuiltWorker,
  WorkerBuilder,
  PrebuildOptions,
  rcConfig,
  WorkerCallback,
  Callback,
  DebounceType,
};
