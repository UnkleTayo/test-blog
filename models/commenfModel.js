const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  content: {
    type: Schema.Types.String,
    maxlength: 500,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
