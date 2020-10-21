/**
 * @jest-environment jsdom
 */
import CargoBay from '../bays';
const code = `onmessage = e => {
  setTimeout(() => {
    postMessage(JSON.stringify(e));
  }, 2000)
}`;
const workerURL = URL.createObjectURL(new Blob([code]));

const buildPayloads = (
  payloadCount: number
): Record<'somePayload', number>[] => {
  return Array(payloadCount)
    .fill(0)
    .map((dud: number, index: number) => ({ somePayload: index }));
};

const fixtures = [
  {
    name: 'TEST_KEY',
    promisify: false,
    workerContent: [
      {
        poolingPriority: 0.3,
        terminate: true,
        url: workerURL,
        label: 'TEST_KEY',
      },
    ],
    onmessageCallback: (datum: MessageEvent<any>) => {
      return datum;
    },
  },
  {
    name: 'TEST_KEY',
    promisify: true,
    workerContent: [
      {
        poolingPriority: 0.3,
        terminate: true,
        url: workerURL,
        label: 'TEST_KEY',
      },
    ],
    onmessageCallback: (data: MessageEvent<any>, ...rest: any[]) => {
      return [data, rest];
    },
  },
];

let bay = new CargoBay({
  name: 'TEST_KEY',
  promisify: true,
  workerContent: [
    {
      poolingPriority: 0.3,
      terminate: false,
      url: workerURL,
      label: 'TEST_KEY',
    },
  ],
  onmessageCallback: datum => {
    return datum;
  },
});

describe('Cargobays', () => {
  beforeEach(() => {
    bay = new CargoBay(fixtures[0]);
  });
  it('should construct a cargobay without failing', () => {
    expect(bay).toBeInstanceOf(CargoBay);
    expect(bay.config).toBeTruthy();
    expect(bay.debounceFunction).toStrictEqual(null);
    expect(bay.promiseStorage).toStrictEqual({});
    expect(bay.aggregateStorage).toStrictEqual({});
  });

  it('Should be able to ship multiple messages to the same worker without crashing', () => {
    bay.shipBay('TEST_KEY', buildPayloads(10));
  });

  it('Should be able to await the worker asyncronously', async () => {
    bay = new CargoBay(fixtures[1]);
    const response = await bay.shipBay('TEST_KEY', buildPayloads(30));
    expect(response).not.toEqual(undefined);
    expect(response).not.toEqual(null);
  });
});
