var mongoose = require('mongoose');

var FriendRequestSchema = new mongoose.Schema({
  fromUser : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  toUser : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

FriendRequestSchema.pre('validate', function(next) {
    if (this.fromUser == this.toUser) {
        next(Error('A User cannot friend request themselves'));
    } else {
        next();
    }
});

FriendRequestSchema.pre('save', function (next) {

  var self = this;

  self.constructor.findOne({ fromUser: self.fromUser, toUser: self.toUser}, function (err, results) {
    if (results) {
      next(new Error('FriendRequest between these two users already exists'));
    }

    self.constructor.findOne({ fromUser: self.toUser, toUser: self.fromUser}, function (err, results) {
      if (results) {
        next(new Error('FriendRequest between these two users already exists'));
      }

      next();
    });
  });

});

module.exports = mongoose.model('FriendRequest',FriendRequestSchema);
