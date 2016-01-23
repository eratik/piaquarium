var http = require('http');
var moment = require('moment');
var tz = require('moment-timezone');

var daylengthURL = 'http://api.sunrise-sunset.org/json?lat=34.274647&lng=-119.229034&formatted=0';
var timezone = 'America/Los_Angeles';
var timeFormat = 'h:mma';

var DayLength = {
  dayLengthRes: null,
  sunrise: null,
  sunset: null,
  getDayLength: function(callback){
    if(this.dayLengthRes)
      callback(this.dayLengthRes);
    http.get(daylengthURL, function(res){
      res.on('data', (chunk) => {
        this.dayLengthRes = this.dayLengthRes ? this.dayLengthRes + chunk : chunk ;
      });
      res.on('end', () => {
        //this.sunrise = JSON.parse(this.dayLengthRes);
        this.dayLengthRes = JSON.parse(this.dayLengthRes).results;
        this.sunrise = moment.utc(this.dayLengthRes.sunrise).tz(timezone).format(timeFormat);
        this.sunset = moment.utc(this.dayLengthRes.sunset).tz(timezone).format(timeFormat);
        this.dayLengthRes.sunrise = this.sunrise;
        this.dayLengthRes.sunset = this.sunset;
        callback(null, this.dayLengthRes);
      });

    }).on('error', function(e){
      callback(e, null);
      console.log(e);
    });
  }
}

module.exports = DayLength;
