var FriendRequest = require('./friend-request');
var responseHandler = require('../response-handler');
var queryFormatter = require('../query-formatter');

var controller = {};

// Get Current User's FriendRequest(s)
controller.index = function (req,res) {

  return FriendRequest.find({'toUser': req.user._id})
  .populate('fromUser').populate('toUser').exec().then(
    responseHandler.respondWithResult(res))
  .catch(responseHandler.handleError(res));
  
}

// Create FriendRequest(s) in the database
controller.create = function (req,res) {

  return FriendRequest.create(req.body.friendRequests).then( function (friendRequests) {
    return FriendRequest.populate(friendRequests, { path: 'fromUser toUser'});
  })
  .then(responseHandler.respondWithResult(res,201))
  .catch(responseHandler.handleError(res));
}

controller.delete = function (req,res) {
  return FriendRequest.findOneAndRemove(req.params.id)
  .remove().exec().then(responseHandler.respondWithResult(res))
  .catch(responseHandler.handleError(res));
}

module.exports = controller;
