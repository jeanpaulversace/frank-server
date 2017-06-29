var User = require('../user/user');
var FriendRequest = require('../friend-request/friend-request');
var responseHandler = require('../../utils/response-handler');

var controller = {};

// User - Add Friends Functionality
controller.index = function (req, res) {

  var usersSentFriendRequest = [];
  var usersReceivedFriendRequest = [];

  // Find Users who have sent a Friend Request
  FriendRequest.find({toUser: req.user.id}).populate('fromUser').exec().then( function (friendRequestArray) {
    for (var i = 0; i < friendRequestArray.length; i++) {
      var friendRequest = friendRequestArray[i];
      usersSentFriendRequest.push(friendRequest.fromUser._id);
    }

    // Find Users who have received a Friend Request
    return FriendRequest.find({fromUser: req.user.id}).populate('toUser').exec()

  }).then( function (friendRequestArray) {
    for (var i = 0; i < friendRequestArray.length; i++) {
      var friendRequest = friendRequestArray[i];
      usersReceivedFriendRequest.push(friendRequest.toUser._id);
    }

    // Find Users that the current user is already friends with
    return User.findOne({_id:req.user.id}).populate('friends').exec()

  }).then( function (user) {

    var friends = user.friends;
    var friendsArray = [];

    for (var i = 0; i < friends.length; i++) {
      friendsArray.push(friends[i]._id)
    }

    var excludedUsers = friendsArray.concat(usersSentFriendRequest).concat(usersReceivedFriendRequest);

    if (user.phoneNumber) {
      excludedUsers.push(user._id);
    }

    // Find users that match sent phone numbers but excludes friends, users the current user has sent a friend request to,
    // and users that have sent a friend request to the current user
    return User.find().nin('_id',excludedUsers).in('phoneNumber',req.body.phoneNumbers).exec();

  }).then(responseHandler.respondWithResult(res))
  .catch(responseHandler.handleError(res));

}

module.exports = controller;
