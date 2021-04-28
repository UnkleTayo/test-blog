const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  postID: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    index: true,
  },
  content: {
    type: Schema.Types.String,
    maxlength: 500,
    trim: true,
  },
  likes: {
    type: Schema.Types.Number,
    default: 0,
  },
  isPublished: {
    type: Schema.Types.Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    select: false,
    index: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    select: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
