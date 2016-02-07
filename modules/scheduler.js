var schedule = require("node-schedule");
var rfCon = require("./rfcontroller.js");
var logger = require('./logger.js');

(function(){
    // Second, Min, Hour, Month, Day Of Week
  var sunriseJob = schedule.scheduleJob('0 0 7 * * *', function(){
      logger.info('Sunrise Schedule Fired');
      rfCon.lightNightOff();
      // Debounce
      setTimeout(function(){
        rfCon.lightDayOn();
      },1000);
  });

  var sunsetJob = schedule.scheduleJob('0 10 20 * * *', function(){
    logger.info('Sunset Schedule Fired');
    rfCon.lightDayOff();
    // Debounce
    setTimeout(function(){
      rfCon.lightNightOn();
    },1000);
  });

})();
