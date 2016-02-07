var rpi433 = require('rpi-433');
var rfSend = rpi433.sendCode;
var logger = require('./logger.js');

var RFController = {
  rfDevices: {
    lightday: {on:333107, off:333116},
    lightnight: {on:333251, off:333260}
  },
  sendDeviceCode: function(code){
    rfSend(code, 0, function(error, stdout) {   //Send 1234
      if(!error) logger.info('Device Signal Sent: ' + stdout); //Should display 1234
      else
       logger.error(error);
    });
  },
  lightDayOn: function(){
    logger.info('light day on called');
    this.sendDeviceCode(this.rfDevices.lightday.on);
  },
  lightDayOff: function(){
    logger.info('light day off called');
    this.sendDeviceCode(this.rfDevices.lightday.off);
  },
  lightNightOn: function(){
    logger.info('light night on called');
    this.sendDeviceCode(this.rfDevices.lightnight.on);
  },
  lightNightOff: function(){
    logger.info('light night of called');
    this.sendDeviceCode(this.rfDevices.lightnight.off);
  }
};

module.exports = RFController;
