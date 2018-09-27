const Temp = require('../models/temp');

// Display list of all books.
exports.tempList = function(req, res, next) {
  Temp.find({}, 'room')
    .populate('room')
    .exec(function (err, list_temps) {
      if (err) { return next(err); }
      //Successful, so render
      res.send(JSON.stringify(list_temps));
    });
};
