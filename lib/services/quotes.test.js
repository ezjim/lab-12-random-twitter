const getQuote = require('./quotes');

jest.mock('superagent', () => {
  return {
    get() {
      return Promise.resolve ({
        body: ['Any dog under fifty pounds is a cat and cats are useless.']
      });
    }
  };
});

describe('get quotes function', () => {
  it('gets a ron swanson quote', () => {
    return getQuote()
      .then(quote => {
        expect (quote).toEqual('Any dog under fifty pounds is a cat and cats are useless.');
      });
  });
});
