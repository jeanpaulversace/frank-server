var Feeling = require('./feeling');
var responseHandler = require('../../utils/response-handler');
var queryFormatter = require('../../utils/query-formatter');

var controller = {};

// Search Feeling in database
controller.search = function (req,res) {
  return Feeling.find(req.body).populate('creator').exec()
  .then(responseHandler.respondWithResult(res))
  .catch(responseHandler.handleError(res));
}

// Create Feeling in the database
controller.create = function (req,res) {
  return Feeling.create([req.body.feeling])
  .then(responseHandler.respondWithResult(res,201))
  .catch(responseHandler.handleError(res));
}


module.exports = controller;
