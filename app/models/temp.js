//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TempSchema = new Schema({
  mac: {type: String, required: true},
  tempature: {type: Number, required: true},
  humidity: {type: Number},
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Temp', TempSchema);
