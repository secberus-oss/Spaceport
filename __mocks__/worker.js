class Worker {
  constructor(a) {
    return {
      config: a,
    };
  }
  postmessage() {
    return true;
  }
  onmessage() {
    return true;
  }
  terminate() {
    Object.keys(this).forEach(i => delete this[i]);
  }
}
// eslint-disable-next-line
global.Worker = window['worker'] = jest.fn(c => new Worker({ config: c }));
