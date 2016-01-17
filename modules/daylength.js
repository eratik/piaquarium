var http = require('http');
var moment = require('moment');
var tz = require('moment-timezone');

var daylengthURL = 'http://api.sunrise-sunset.org/json?lat=34.274647&lng=-119.229034&formatted=0';
var utcOffset = -8;
var timezone = 'America/Los_Angeles';

var DayLength = {
  dayLengthRes: null,
  sunrise: null,
  sunset: null,
  getDayLength: function(){
    http.get(daylengthURL, function(res){
      sunrise = res.sunrise;
      sunset = res.sunset;

      res.on('data', (chunk) => {
        this.dayLengthRes = this.dayLengthRes ? this.dayLengthRes + chunk : chunk ;
      });
      res.on('end', () => {
        //this.sunrise = JSON.parse(this.dayLengthRes);
        var completedResults = JSON.parse(this.dayLengthRes).results;
        this.sunrise = moment.utc(completedResults.sunrise).tz('America/Los_Angeles').format('YYYY-MM-DD hh:mma');
        this.sunset = moment.utc(completedResults.sunset).tz('America/Los_Angeles').format('YYYY-MM-DD hh:mma');
        console.log(this.sunrise + ' ' + this.sunset);
      });

    }).on('error', function(e){
      console.log(e);
    });
  }
}

module.exports = DayLength;
