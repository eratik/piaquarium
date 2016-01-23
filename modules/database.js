var loki = require('lokijs');
var db = new loki('piquarium.db');

// Add a collection to the database
var chemicalreadings = db.addCollection('chemicals');

var ChemicalReadings = {
  add:  function(reading){
    chemicalreadings.insert(reading);
  },
  getall: function(){
    return chemicalreadings.find();
  }
};

module.exports = ChemicalReadings;
