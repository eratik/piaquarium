var express = require('express');
var router = express.Router();
var dayLen = require('../modules/daylength.js');
var rfCon = require('../modules/rfcontroller.js');
var db = require('../modules/database.js');

var lightDayOn=false;
var lightNightOn=false;

/* GET home page. */
router.get('/', function(req, res) {
  dayLen.getDayLength(function(err, data){
    if(err){
      console.log('Day Length Call Error: ' + err);
      res.sendStatus(500);
    }
    else{
      setTimeout(function(){
        global.io.emit('daylength', data);
      },5000);
    }
  })
  res.render('index', { title: 'Express', sunrise: '5:02am', sunset: '7:02pm' });
});

router.get('/daylength', function(req, res){
  dayLen.getDayLength(function(err, data){
    if(err){
      console.log('Day Length Call Error: ' + err);
      res.sendStatus(500);
    }
    else{
      res.json(data);
    }
  })
});

router.get('/lightday', function(req, res){
  lightDayOn === true? rfCon.lightDayOff() : rfCon.lightDayOn();
  lightDayOn === true? lightDayOn=false : lightDayOn=true;
  res.end();
});

router.get('/lightnight', function(req, res){
  lightNightOn === true? rfCon.lightDayOff() : rfCon.lightDayOn();
  lightNightOn === true? lightNightOn=false : lightNightOn=true;
  res.end();
});

router.get('/chemicals', function(req, res){
  db.add({now: Date.now(), ph: 12, amonia: 34, nitrite: 56, nitrate: 78});
  res.json(db.getall());
});

module.exports = router;
