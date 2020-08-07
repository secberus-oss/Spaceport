import CargoBay from '../bays';

let bay = new CargoBay({
  name: 'Testing Cargo Bay',
  workerContent: [
    {
      poolingPriority: 0.3,
      terminate: false,
      url: 'http://localhost:3000/fixture.js',
      label: 'Test Worker 1',
    },
  ],
  onmessageCallback: datum => {
    console.log(datum);
  },
});

describe('Cargobays', () => {
  beforeEach(() => {
    bay = new CargoBay({
      name: 'Testing Cargo Bay',
      workerContent: [
        {
          poolingPriority: 0.3,
          terminate: false,
          url: 'http://localhost:3000/fixture.js',
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
});
