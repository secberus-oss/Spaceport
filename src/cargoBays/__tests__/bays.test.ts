import CargoBay from '../bays';

describe('Cargobays', () => {
  it('should construct a cargobay without failing', () => {
    const bay = new CargoBay({
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

    expect(bay).toBeInstanceOf(CargoBay);
  });
});
