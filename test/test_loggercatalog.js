const assert = require('chai').assert;

const LoggerCatalog = require('./../index.js');

describe('LoggerCatalog', () => {
  it('getLogger - success', () => {
    const loggerA = LoggerCatalog.getLogger('a', 'b');
    LoggerCatalog.getLogger('a', 'c');
    const loggerB = LoggerCatalog.getLogger('a', 'b');

    assert.deepEqual(loggerA, loggerB);
  });
});
