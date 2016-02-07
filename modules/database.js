var pouch = require('pouchdb');
var db = new pouch('chemicals');
var logger = require('./logger.js');

// Add a collection to the database

var ChemicalReadings = {
  add:  function(reading){
    db.post(reading).then(function(res){
      logger.info(res);
    }).catch(function(err){
      logger.error(err);
    });
  },
  getall: function(callback){
    // Load DB from file
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      logger.info(result);
      callback(null, result.rows.reverse());
    }).catch(function (err) {
      logger.error(err);
      return callback(err, []);
    });
  }
};

module.exports = ChemicalReadings;
