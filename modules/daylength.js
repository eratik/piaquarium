var http = require('http');
var moment = require('moment');
var tz = require('moment-timezone');

var daylengthURL = 'http://api.sunrise-sunset.org/json?lat=34.274647&lng=-119.229034&formatted=0';
var timezone = 'America/Los_Angeles';
var timeFormat = 'YYYY-MM-DD hh:mma';

var DayLength = {
  dayLengthRes: null,
  sunrise: null,
  sunset: null,
  getDayLength: function(){
    http.get(daylengthURL, function(res){
      res.on('data', (chunk) => {
        this.dayLengthRes = this.dayLengthRes ? this.dayLengthRes + chunk : chunk ;
      });
      res.on('end', () => {
        //this.sunrise = JSON.parse(this.dayLengthRes);
        var completedResults = JSON.parse(this.dayLengthRes).results;
        this.sunrise = moment.utc(completedResults.sunrise).tz(timezone).format(timeFormat);
        this.sunset = moment.utc(completedResults.sunset).tz(timezone).format(timeFormat);
        console.log(this.sunrise + ' ' + this.sunset);
      });

    }).on('error', function(e){
      console.log(e);
    });
  }
}

module.exports = DayLength;
