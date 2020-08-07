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

describe('Build bays should be able to be preloaded with a set of requests as a shipment', () => {
  beforeEach(
    () =>
      (bay = new CargoBay({
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
      }))
  );

  it('Should start without crashing', () => {
    expect(1).toStrictEqual(1);
  });
});
