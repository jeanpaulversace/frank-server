var mongoose   = require('mongoose');

var UserSchema = new mongoose.Schema({
  facebookId: String,
  accessToken: String,
  email: String,
  name: String,
  phoneNumber: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('User',UserSchema);
