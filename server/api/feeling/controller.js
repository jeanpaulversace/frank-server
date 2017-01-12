var Feeling = require('./feeling');
var responseHandler = require('../response-handler');
var queryFormatter = require('../query-formatter');

var controller = {};

// Create Feeling in the database

controller.search = function (req,res) {

  return Feeling.find(req.body).populate('creator').exec()
  .then(responseHandler.respondWithResult(res))
  .catch(responseHandler.handleError(res));

  // return Feeling.find().in('creator',req.user.friends).where('createdAt').gte(yesterday).populate('creator').exec()
  // .then(responseHandler.respondWithResult(res))
  // .catch(responseHandler.handleError(res));
}

controller.create = function (req,res) {

  return Feeling.create([req.body.feeling])
  .then(responseHandler.respondWithResult(res,201))
  .catch(responseHandler.handleError(res));
}


module.exports = controller;
