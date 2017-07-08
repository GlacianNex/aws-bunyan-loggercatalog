const bunyan = require('bunyan');
const createCWStream = require('bunyan-cloudwatch');

class LoggerCatalog {

  constructor() {
    this.ts = Date.now();
    this.loggers = {};
  }

  getLogger(group, stream) {
    const name = LoggerCatalog._getLoggerName(group, stream);
    let logger = this.loggers[name];
    if (!logger) {
      logger = this._create(group, stream);
      this.loggers[name] = logger;
    }
    return logger;
  }

  static _getLoggerName(group, stream) {
    return `${group}-${stream}`;
  }

  _create(groupName, streamName) {
    const stream = createCWStream({
      logGroupName: groupName,
      logStreamName: streamName,
      cloudWatchLogsOptions: {
        region: process.env.AWS_REGION,
      },
    });

    const logger = bunyan.createLogger({
      name: streamName,
      level: bunyan.DEBUG,
      streams: [{
        stream,
        type: 'raw',
      }, {
        stream: process.stdout,
      }],
    });

    this.loggers[LoggerCatalog._getLoggerName(groupName, streamName)] = logger;
    return logger;
  }
}

let instance = null;

function getInstance() {
  if (!instance) {
    instance = new LoggerCatalog();
  }

  console.log(instance);
  return instance;
}

module.exports = getInstance();
