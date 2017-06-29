var User = require('./user');
var ObjectId = require('mongoose').Types.ObjectId;
var responseHandler = require('../../utils/response-handler');

var controller = {};

controller.show = function (req,res) {

  return User.findById(req.params.id).exec()
  .then(responseHandler.handleEntityNotFound(res))
  .then(responseHandler.respondWithResult(res))
  .catch(responseHandler.handleError(res));

}

controller.update = function (req,res) {

  return User.findOneAndUpdate({_id: req.params.id}, {$set:req.body.user}, {new: true}).exec()
    .then(responseHandler.respondWithResult(res))
    .catch(responseHandler.handleError(res));

}

module.exports = controller;
