/* eslint-disable no-underscore-dangle */

import debounce from 'lodash/debounce';
import { WorkerConfig } from '../types/SpaceportTypes';
import { Cancelable } from 'lodash';

const SUPPORT_WORKERS = !!window.Worker || !!Worker;

const THREAD_COUNT = navigator.hardwareConcurrency || 4;

type Callback = ({
  data,
  postmessagePayload,
  ...rest
}: Record<string, unknown>) => unknown;

type DebounceType = ReturnType<typeof debounce>;

interface WorkerStorage {
  workerArray: Array<Worker | never>;
  url: string;
  poolingPriority?: number;
  terminate?: boolean;
  terminationRuns?: boolean | number;
}

interface BayConfig {
  workerContent: WorkerConfig | Array<WorkerConfig>;
  name: string;
  headers?: Record<string, unknown>;
  useAggregator?: boolean;
  promisify?: boolean;
  timeout?: number;
  aggregatorTimeout?: number;
  postmessagePayload?: Record<string, unknown>;
  onmessageCallback: Callback | null;
  aggregativeCallback: Callback | null;
}

interface PromiseStorage {
  identifier: string;
  resolvePromise: () => void;
}

class Bays {
  public config: BayConfig;
  public debounceFunction: DebounceType | number | null | Cancelable;
  public promiseStorage: Record<string, PromiseStorage> | null;
  public aggregateStorage: Record<string, unknown>;
  public workerStorage: Record<string, WorkerStorage>;

  constructor({
    onmessageCallback,
    name,
    workerContent,
    postmessagePayload = {},
    headers = {},
    useAggregator = false,
    promisify = false,
    timeout = 50,
    aggregatorTimeout = 0,
    aggregativeCallback = null,
  }: BayConfig) {
    if (!SUPPORT_WORKERS) {
      throw new Error('Workers are not supported. Exiting creation');
    }
    this.aggregateStorage = {};
    this.promiseStorage = {};
    this.debounceFunction = null;
    this.workerStorage = {};
    this.config = {
      name,
      workerContent: Array.isArray(workerContent)
        ? workerContent
        : [workerContent],
      headers,
      useAggregator,
      promisify,
      timeout,
      postmessagePayload,
      aggregatorTimeout,
      onmessageCallback,
      aggregativeCallback,
    };
    if (!Array.isArray(this.config.workerContent)) {
      throw new TypeError('workerContent is not an array or single item.');
    }
    this.config.workerContent.forEach((worker: WorkerConfig) => {
      this.workerStorage[worker.label] = {
        workerArray: [],
        url: worker.url,
        poolingPriority: worker.poolingPriority || 0.25,
        terminate: worker.terminate || false,
        terminationRuns: worker.terminationRuns || 1,
      };
    });
    if (this.config.useAggregator) {
      if (this.config.aggregativeCallback !== null) {
        this.debounceFunction = debounce(
          () => {
            typeof this.config.aggregativeCallback === 'function' &&
              this.config.aggregativeCallback({ data: this.aggregateStorage });
          },
          this.config.timeout,
          {
            trailing: true,
          }
        );
      }
    }
    if (this.config.promisify) {
      this.__promisify();
    }
    this.__buildWorkers();
  }

  /**
   * label: string;
  poolingPriority?: number;
  terminate?: boolean;
  terminationRuns?: boolean;
  url: string;
   */
  public addData(): void {
    typeof this.debounceFunction === 'function' && this.debounceFunction();
  }

  public cancelDebounce(): boolean {
    try {
      if (
        typeof this.debounceFunction !== 'number' &&
        this.debounceFunction !== null
      ) {
        this.debounceFunction.cancel();
      } else {
        throw new TypeError(
          'Typeof debounce function is not a debounce function'
        );
      }
      return true;
    } catch (e) {
      console.error(e || "Debounce not cancelled. Maybe it doesn't exist?");
      return false;
    }
  }
  private __buildWorkers() {
    if (!SUPPORT_WORKERS) {
      console.warn(
        'Workers not supported. Not generating workers. Recommend fallback.'
      );
      return false;
    }
    if (!Array.isArray(this.config.workerContent)) {
      throw new TypeError('workerContent is not an array or single item.');
    }
    this.config.workerContent.forEach((worker: WorkerConfig) => {
      for (
        let i = 0;
        i <= Math.ceil((worker.poolingPriority || 0.25) * THREAD_COUNT);
        i++
      ) {
        this.workerStorage[worker.label].workerArray.push(
          new Worker(worker.url)
        );
      }
    });
  }

  private __aggregator() {
    //
  }

  private __builder() {
    //
  }

  private __promisify() {
    //
  }

  private __resolvePromisify() {
    //
  }
}

export default Bays;
