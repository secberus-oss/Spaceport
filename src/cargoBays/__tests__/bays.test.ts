/**
 * @jest-environment jsdom
 */

import { Console } from 'console';
import CargoBay from '../bays';
const code = `onmessage = e => {
  setTimeout(() => {
    postMessage(JSON.stringify(e));
  }, 2000)
}`;
const workerURL = URL.createObjectURL(new Blob([code]));

let bay = new CargoBay({
  name: 'Testing Cargo Bay',
  promisify: true,
  workerContent: [
    {
      poolingPriority: 0.3,
      terminate: false,
      url: workerURL,
      label: 'Test Worker 1',
    },
  ],
  onmessageCallback: (datum, a = 2, b = 3, c = 4) => {
    console.log(datum);
    console.log(a);
    console.log(b);
    console.log(c);
  },
});

describe('Cargobays', () => {
  beforeEach(() => {
    bay = new CargoBay({
      name: 'Testing Cargo Bay',
      promisify: true,
      workerContent: [
        {
          poolingPriority: 0.3,
          terminate: false,
          url: workerURL,
          label: 'Test Worker 1',
        },
      ],
      onmessageCallback: datum => {
        console.log(datum);
      },
    });
  });
  it('should construct a cargobay without failing', () => {
    expect(bay).toBeInstanceOf(CargoBay);
    expect(bay.config).toBeTruthy();
    expect(bay.debounceFunction).toStrictEqual(null);
    expect(bay.promiseStorage).toStrictEqual({});
    expect(bay.aggregateStorage).toStrictEqual({});
  });
  it('should ship cargobays', async () => {
    const startTime = Date.now();
    console.log('Shipping');
    const response = await bay.shipBay('Test Worker 1', [
      {
        somePayload: true,
      },
      {
        somePayload: true,
      },
      {
        somePayload: true,
      },
    ]);
    console.log(response);
    console.log(`Took ${Date.now() - startTime}ms`);
    expect(bay.promiseStorage).not.toEqual({});
  });
  it('Should be able to ship multiple messages to the same worker', async () => {
    const startTime = Date.now();
    const response = await bay.shipBay(
      'Test Worker 1',
      Array(30)
        .fill(0)
        .map((dud: any, index: number) => ({ somePayload: index }))
    );
    console.log(response);
    console.log(`Took ${Date.now() - startTime}ms`);
    expect(bay.promiseStorage).not.toEqual({});
  });
});
