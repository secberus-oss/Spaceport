import CargoBay from '../bays';
import 'jsdom-worker';

describe('Cargobays', () => {
  it('should construct a cargobay without failing', () => {
    const bay = new CargoBay({
      name: 'Testing Cargo Bay',
      workerContent: [
        {
          poolingPriority: 0.3,
          terminate: false,
          url: '/fixture.js',
          label: 'Test Worker 1',
        },
      ],
      onmessageCallback: datum => {
        console.log(datum);
      },
    });

    expect(bay).toBeInstanceOf(CargoBay);
  });
});
