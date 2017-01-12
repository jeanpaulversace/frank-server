var mongoose = require('mongoose');

var FeelingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    enum: [1,2,3,4]
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feeling', FeelingSchema);
