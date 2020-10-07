import CargoBay from '../bays';
const code = `onmessage = e => {
  console.log(e);
  postMessage(e.data);
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
    expect(bay.promiseStorage).toStrictEqual([]);
    expect(bay.aggregateStorage).toStrictEqual({});
  });
  it('should ship cargobays', () => {
    bay.shipBay('Test Worker 1', [
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
    expect(bay.promiseStorage?.length).toBeGreaterThan(0);
  });
});
