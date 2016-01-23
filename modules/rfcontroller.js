var rpi433 = require('rpi-433');
var rfSend = rpi433.sendCode;

var RFController = {
  rfDevices: {
    lightday: {on:333107, off:333116},
    lightnight: {on:333251, off:333260}
  },
  sendDeviceCode: function(code){
    rfSend(code, 0, function(error, stdout) {   //Send 1234
      if(!error) console.log('Device Signal Sent: ' + stdout); //Should display 1234
      else
       console.log(error);
    });
  },
  lightDayOn: function(){
    console.log('light day on called');
    this.sendDeviceCode(this.rfDevices.lightday.on);
  },
  lightDayOff: function(){
    console.log('light day off called');
    this.sendDeviceCode(this.rfDevices.lightday.off);
  },
  lightNightOn: function(){
    this.sendDeviceCode(this.rfDevices.lightnight.on);
  },
  lightNightOff: function(){
    this.sendDeviceCode(this.rfDevices.lightnight.off);
  }
};

module.exports = RFController;
