import CargoBay from '../bays';

const code = `onmessage = e => postMessage(e.data)`;
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
  onmessageCallback: datum => {
    console.log(datum);
  },
});

describe('Build bays should be able to be preloaded with a set of requests as a shipment', () => {
  beforeEach(
    () =>
      (bay = new CargoBay({
        promisify: true,
        name: 'Testing Cargo Bay',
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
      }))
  );

  it('Should start without crashing', () => {
    expect(1).toStrictEqual(1);
  });
});
