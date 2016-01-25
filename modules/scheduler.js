var rfCon = require("rfcontroller.js");

(function(){
    // Second, Min, Hour, Month, Day Of Week
  var sunriseJob = schedule.scheduleJob('00 59 20 * * *', function(){
      console.log('Sunrise Schedule Fired');
      rfCon.lightNightOff();
      // Debounce
      setTimeout(function(){
        rfCon.lightDayOn();
      },1000);
  });

  var sunsetJob == schedule.scheduleJob('00 00 21 * * *', function(){
    console.log('Sunset Schedule Fired');
    rfCon.lightDayOff();
    // Debounce
    setTimeout(function(){
      rfCon.lightNightOn();
    },1000);
  });

})();
