const { string } = require('joi');
const mongoose = require('mongoose');
const { titleToSlug } = require('../utils/urlSlug');

const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 300,
      trim: true,
      unique: true,
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
    photo:{
      type: Schema.Types.String,
      required: false,
    },
    categories:{
      type:Schema.Types.Array,
      required: false,
    },
    tags: [
      {
        type: Schema.Types.String,
        trim: true,
        uppercase: true,
      },
    ],
    likes: [mongoose.Schema.Types.ObjectId],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    status: {
      type: Schema.Types.String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    publishedAt: {
      type: Schema.Types.Date,
      required: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

postSchema.pre('save', function (next) {
  this.slug = titleToSlug(this.slug);
  next();
});

module.exports = Post;
