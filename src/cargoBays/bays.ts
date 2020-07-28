/* eslint-disable no-underscore-dangle */
interface BayConfig {
  name: string;
  workerLocation: string;
  headers?: Record<string, unknown>;
  useAggregator?: boolean;
  promisify?: boolean;
  timeout?: number;
  aggregatorTimeout?: number;
  postmessagePayload?: Record<string, unknown>;
  onmessageCallback: ({
    data,
    postmessagePayload,
    ...rest
  }: Record<string, unknown>) => unknown;
}

interface PromiseStorage {
  identifier: string;
  resolvePromise: () => void;
}

class Bays {
  public config: BayConfig;
  public debounceFunction: number | null;
  public promiseStorage: PromiseStorage | null;

  constructor({
    onmessageCallback,
    name,
    workerLocation,
    postmessagePayload = {},
    headers = {},
    useAggregator = false,
    promisify = false,
    timeout = 0,
    aggregatorTimeout = 0,
  }: BayConfig) {
    this.debounceFunction = null;
    this.promiseStorage = null;
    this.config = {
      name,
      workerLocation,
      headers,
      useAggregator,
      promisify,
      timeout,
      postmessagePayload,
      aggregatorTimeout,
      aggregatorCallback,
    };
    if (
      this.config.useAggregator &&
      typeof this.config.aggregatorCallback === 'function'
    ) {
      this.debounce();
    }
  }

  buildWorker() {}

  getWorkers() {}

  getOpenRequests() {}

  addData() {
    this.debounce();
  }

  private debounce(): void {
    if (this.debounceFunction) {
      clearTimeout(this.debounceFunction);
    }
    this.debounceFunction = setTimeout(() => {
      this.__aggregator();
    }, this.config.timeout);
  }

  private __aggregator() {}

  private __builder() {}

  private __promisify() {}

  private __resolvePromisify() {}
}

export default Bays;
