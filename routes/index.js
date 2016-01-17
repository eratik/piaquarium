var express = require('express');
var router = express.Router();
var dayLen = require('../modules/daylength.js');
var rfCon = require('../modules/RFController.js');

var lightDayOn=false;

/* GET home page. */
router.get('/', function(req, res) {
  dayLen.getDayLength();
  res.render('index', { title: 'Express', sunrise: '5:02am', sunset: '7:02pm' });
});

router.get('/lightday', function(req, res){
  lightDayOn === true? rfCon.lightDayOff() : rfCon.lightDayOn();
  lightDayOn === true? lightDayOn=false : lightDayOn=true;
  
  console.log('lightday clicked');
});

module.exports = router;
