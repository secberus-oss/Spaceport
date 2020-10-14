/* eslint-disable no-underscore-dangle */
import debounce from 'lodash/debounce';
import {
  WorkerConfig,
  BayConfig,
  DebounceType,
  PromiseStorage,
  WorkerStorage,
  PromiseStorageAttr,
  WithSpaceportInternals,
  SpaceportInternals,
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

  private __buildWorkers(): boolean {
    if (!SUPPORT_WORKERS) {
      console.warn(
        'Workers not supported. Not generating workers. Recommend fallback for code if one does not exist..'
      );
      return false;
    }
    if (!Array.isArray(this.config.workerContent)) {
      throw new TypeError(
        'Spaceport: workerContent is not an array or single item.'
      );
    }
    this.config.workerContent.forEach((worker: WorkerConfig) => {
      for (
        let i = 0;
        i <= Math.ceil((worker.poolingPriority || 0.25) * THREAD_COUNT);
        i++
      ) {
        const newLength = this.workerStorage[worker.label].workerArray.push(
          new Worker(worker.url)
        );
        this.__setOnmessageEventListener(newLength - 1, worker.label);
      }
    });
    return true;
  }

  async shipBay(
    identifier: string,
    payload: Record<string, unknown>[]
  ): Promise<PromiseSettledResult<Promise<boolean> | undefined | null>[]> {
    const constructedPayload = Array.isArray(payload) ? payload : [payload];
    const promises: string[] = [];
    try {
      if (payload.length === 0) {
        throw new Error('Spaceport: Cannot ship a cargobay with no payload!');
      }
      const bay = this.workerStorage[identifier];
      if (bay.workerArray.length > 0) {
        constructedPayload.forEach(
          (payloadItem: Record<string, any>, index: number) => {
            console.log(bay.workerArray);
            const callbackKey = v4();
            promises.push(callbackKey);
            const currentIndex =
              index < bay.workerArray.length
                ? index
                : index % bay.workerArray.length;
            console.log(currentIndex);
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

  private __setOnmessageEventListener(
    workerIndex: number,
    identifier: string
  ): boolean {
    if (
      !(
        this.workerStorage?.[identifier]?.workerArray?.[workerIndex] instanceof
        Worker
      )
    ) {
      console.error(
        'Spaceport was unable to initialize the worker. Make sure your worker threads are requesting an actual worker or blob URL.'
      );
      return false;
    }
    this.workerStorage[identifier].workerArray[workerIndex].onmessage = (
      messageResponse: MessageEvent<any>
    ): any => {
      const executable = this.workerStorage[identifier].onmessageCallback;
      const data: string = messageResponse.data;
      const parseData: Record<
        'data',
        WithSpaceportInternals & unknown
      > = (() => {
        try {
          return JSON.parse(data);
        } catch (e) {
          throw new TypeError(
            'Data responses from workers are stringified JSON. Failed to parse json.'
          );
        }
      })();
      const spaceportInternals: boolean | SpaceportInternals =
        'spaceportInternals' in parseData?.data
          ? parseData.data.spaceportInternals
          : false;
      if (!spaceportInternals) {
        throw new Error(
          'Spaceport: Worker error - spaceport has not received internal data from the worker. Make sure your worker postMessage method also includes the event, or at the very least the spaceportInternals object sent with the postMessage. This is required minimal overhead.'
        );
      }
      const { promiseKey } = spaceportInternals;
      const promiseData = this.promiseStorage?.[promiseKey];
      try {
        console.log('resolving promise - ' + promiseKey);
        promiseData?.resolvePromise && promiseData?.resolvePromise(true);
      } catch (err) {
        console.error(`An error occured trying to resolve ${promiseKey}`);
      }
      typeof executable === 'function'
        ? executable({
            workerResponse: data,
          })
        : null;
    };
    return true;
  }

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
  }
}

export default Bays;
