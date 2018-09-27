var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema(
  {
    name: {type: String, required: true},
    mac: {type: Schema.ObjectId, ref: 'Temp', required: true},
    summary: {type: String},
  }
);

// Virtual for room's URL
RoomSchema
.virtual('url')
.get(function () {
  return '/room/' + this._id;
});

//Export model
module.exports = mongoose.model('Room', RoomSchema);
