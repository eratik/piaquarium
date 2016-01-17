var rpi433 = require('rpi-433');
var rfSend = rpi433.sendCode;

var RFController = {
  rfDevices: {
    light-day: {on:333107, off:333116},
    light-night: {on:333107, off:333116},
    light-day: {on:333107, off:333116},
    light-night: {on:333107, off:333116}
  },
  sendDeviceCode: function(code){
    rfSend(code, 0, function(error, stdout) {   //Send 1234
      if(!error) console.log('Device Signal Sent: ' + stdout); //Should display 1234
    });
  },
  lightDayOn: function(){
    this.sendDeviceCode(this.rfDevices.light-day.on);
  },
  lightDayOff: function(){
    this.sendDeviceCode(this.rfDevices.light-day.off);
  },
  lightNightOn: function(){
    this.sendDeviceCode(this.rfDevices.light-night.on);
  },
  lightNightOff: function(){
    this.sendDeviceCode(this.rfDevices.light-night.off);
  }
};
