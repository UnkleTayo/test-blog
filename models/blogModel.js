const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
    maxlength: 300,
    trim: true,
  },
  metaTitle: {
    type: Schema.Types.String,
    maxlength: 500,
    trim: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
    maxlength: 2500,
    trim: true,
  },
  slug: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    maxlength: 200,
    trim: true,
  },
  tags: [
    {
      type: Schema.Types.String,
      trim: true,
      uppercase: true,
    },
  ],
  likes: {
    type: Schema.Types.Number,
    default: 0,
  },
  isSubmitted: {
    type: Schema.Types.Boolean,
    default: false,
  },
  isDraft: {
    type: Schema.Types.Boolean,
    default: true,
  },
  isPublished: {
    type: Schema.Types.Boolean,
    default: false,
  },
  publishedAt: {
    type: Schema.Types.Date,
    required: false,
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
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
