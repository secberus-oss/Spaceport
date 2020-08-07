class Worker {
  constructor(a) {
    return {
      config: a,
    };
  }
}
// eslint-disable-next-line
global.Worker = window['worker'] = jest.fn(c => new Worker({ config: c }));
