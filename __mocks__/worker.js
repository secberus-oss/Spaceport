class Worker {
  constructor(a) {
    this.a = a;
  }
  postmessage() {
    if (Math.random() > 0.1) {
      return true;
    }
  }
  onmessage() {
    if (Math.random() > 0.1) {
      return true;
    }
  }
  terminate() {
    Object.keys(this).forEach(i => delete this[i]);
  }
}
// eslint-disable-next-line
global.Worker = window['worker'] = jest.fn(c => new Worker({ config: c }));
