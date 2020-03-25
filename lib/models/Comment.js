const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweets',
    required: true
  }
});

module.exports = mongoose.model('Comment', schema);
