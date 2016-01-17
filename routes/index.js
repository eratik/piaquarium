var express = require('express');
var router = express.Router();
var dayLen = require('../modules/daylength.js');

/* GET home page. */
router.get('/', function(req, res) {
  dayLen.getDayLength();
  res.render('index', { title: 'Express' });
});

module.exports = router;
