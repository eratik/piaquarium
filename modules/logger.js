var winston = require('winston');
var moment = require('moment');
var tz = require('moment-timezone');
var timezone = 'America/Los_Angeles';
var timeFormat = 'MM/DD/YY h:mma';

winston.emitErrs = true;
winston.remove(winston.transports.Console);

var customLevels = {
  levels:{
    info: 0,
    error: 1
  },
  colors:{
    info: 'blue',
    error: 'red'
  }
};

winston.setLevels(customLevels.levels);
winston.addColors(customLevels.colors);

var logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
          level: 'info',
          handleExceptions: true,
          json: false,
          prettyPrint: true,
          colorize: true,
          timestamp: function() {
            return moment.utc(Date.now()).tz(timezone).format(timeFormat);
          },
         formatter: function(options) {
           // Return string will be passed to logger.
           return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
             (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
         }
      })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
