var User = require('../user');
var ObjectId = require('mongoose').Types.ObjectId;
var responseHandler = require('../../response-handler');

var controller = {};

controller.show = function (req, res) {

  return User.findById(req.params.id).populate('friends').exec()
  .then( function (res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
      if(entity) {
        return res.status(statusCode).json(entity.friends);
      }
      return null;
    };
  }(res))
  .catch(responseHandler.handleError(res));

}

controller.create = function (req, res) {

  return User.update({_id:req.params.id},{ $addToSet: { friends: new ObjectId(req.body.friend)}})
  .exec().then( function (updatedUser) {
    return User.update({_id:req.body.friend},{ $addToSet: { friends: new ObjectId(req.params.id)}})
  }).then(responseHandler.respondWithResult(res))
  .catch(responseHandler.handleError(res));

}

controller.delete = function (req, res) {

  return User.update({_id:req.params.id},{ $pull : { friends: new ObjectId(req.body.friend)}})
  .exec().then( function (updatedUser) {
    return User.update({_id:req.body.friend},{ $pull : { friends: new ObjectId(req.params.id)}})
  }).then(responseHandler.respondWithResult(res))
  .catch(responseHandler.handleError(res));

}

module.exports = controller;
