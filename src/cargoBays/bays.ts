/* eslint-disable no-underscore-dangle */
import debounce from 'lodash/debounce';
import {
  WorkerConfig,
  BayConfig,
  DebounceType,
  PromiseStorage,
  WorkerStorage,
  PromiseStorageAttr,
} from '../types/SpaceportTypes';
import { Cancelable } from 'lodash';
import { v4 } from 'uuid';

const SUPPORT_WORKERS =
  typeof window !== 'undefined' ? !!window.Worker : !!Worker;

const THREAD_COUNT = navigator.hardwareConcurrency || 4;

class Bays {
  public config: BayConfig;
  public debounceFunction: DebounceType | number | null | Cancelable;
  public promiseStorage: PromiseStorage | null;
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

  async shipBay(
    identifier: string,
    payload: Record<string, unknown>[]
  ): Promise<PromiseSettledResult<Promise<boolean> | undefined | null>[]> {
    const constructedPayload = Array.isArray(payload) ? payload : [payload];
    const promises: string[] = [];
    try {
      if (payload.length === 0) {
        throw new Error('Cannot ship a cargobay with no payload.');
      }
      const bay = this.workerStorage[identifier];
      if (bay.workerArray.length > 0) {
        constructedPayload.forEach(
          (payloadItem: Record<string, any>, index: number) => {
            const callbackKey = v4();
            promises.push(callbackKey);
            const currentIndex =
              index > bay.workerArray.length
                ? index
                : index % bay.workerArray.length;
            const currentWorker: Worker = bay.workerArray[currentIndex];
            this.__promisify(callbackKey, identifier, currentIndex);
            payloadItem.spaceportInternals = {
              current: index,
              promiseKey: callbackKey,
            };
            currentWorker.postMessage(payloadItem);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
    return Promise.allSettled(
      this.promiseStorage !== null
        ? Object.entries(this.promiseStorage).map(([key, value]) => {
            if (
              promises.indexOf(key) >= 0 &&
              value.promise instanceof Promise
            ) {
              return value.promise;
            }
          })
        : []
    );
  }

  private __aggregator() {
    //
  }

  private __builder() {
    //
  }

  // Promise.resolve(() => resolve existing worker promise).then((unknown) => unknown)

  private __promisify(
    callbackkey: string,
    identifier: string,
    currentIndex: number
  ): void {
    const workerCallback = this.workerStorage[identifier].onmessageCallback;
    if (workerCallback !== null && typeof workerCallback !== 'undefined') {
      this.workerStorage[identifier].workerArray[currentIndex].onmessage = (
        ...data
      ) => workerCallback({ data });
    }
    if (!this.promiseStorage) {
      this.promiseStorage = {};
    }

    if (!(callbackkey in this.promiseStorage)) {
      const promiseStorage: PromiseStorageAttr = {
        resolvePromise: null,
        promise: null,
      };
      promiseStorage.promise = new Promise(resolve => {
        promiseStorage.resolvePromise = (resolvedInTime: boolean) => {
          resolve(resolvedInTime);
        };
      });
      this.promiseStorage[callbackkey] = promiseStorage;
    }

    this.workerStorage[identifier].workerArray[currentIndex].onmessage = (
      data: unknown,
      executable = this.workerStorage[identifier].onmessageCallback
    ) => {
      const promiseData = this.promiseStorage?.[callbackkey];
      try {
        promiseData?.resolvePromise && promiseData?.resolvePromise(true);
      } catch (err) {
        console.error(`An error occured trying to resolve ${callbackkey}`);
      }
      typeof executable === 'function'
        ? executable({
            workerResponse: data,
          })
        : null;
    };
  }
}

export default Bays;