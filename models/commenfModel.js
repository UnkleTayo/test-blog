const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    content: {
      type: Schema.Types.String,
      maxlength: 500,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
