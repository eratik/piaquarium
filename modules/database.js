var pouch = require('pouchdb');
var db = new pouch('chemicals');

// Add a collection to the database

var ChemicalReadings = {
  add:  function(reading){
    db.post(reading).then(function(res){
      console.log(res);
    }).catch(function(err){
      console.log(err);
    });
  },
  getall: function(callback){
    // Load DB from file
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      console.log(result);
      callback(null, result.rows.reverse());
    }).catch(function (err) {
      console.log(err);
      return callback(err, []);
    });
  }
};

module.exports = ChemicalReadings;
