// eslint-disable-next-line
global.Worker = window['worker'] = jest.fn(c => ({ config: c }));
