import mongoose from 'mongoose'


const blogSchema =  Schema({
  title: {
    type: Schema.Types.String,
    required: true,
    maxlength: 600,
    trim: true
  },
  description: {
    type: Schema.Types.String,
    required: true,
    maxlength: 2500,
    trim: true,
  },
  text: {
    type: Schema.Types.String,
    required: false,
    select: false,
  },
  tags: [
    {
      type: Schema.Types.String,
      trim: true,
      uppercase: true,
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  blogUrl: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    maxlength: 200,
    trim: true,
  },
  likes: {
    type: Schema.Types.Number,
    default: 0,
  },
  isSubmitted: {
    type: Schema.Types.Boolean,
    default: false,
    select: false,
    index: true,
  },
  isDraft: {
    type: Schema.Types.Boolean,
    default: true,
    select: false,
    index: true,
  },
  isPublished: {
    type: Schema.Types.Boolean,
    default: false,
    select: false,
    index: true,
  },
  publishedAt: {
    type: Schema.Types.Date,
    required: false,
    index: true,
  },
  status: {
    type: Schema.Types.Boolean,
    default: true,
    select: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false,
    index: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    required: true,
    select: false,
  },
  updatedAt: {
    type: Date,
    required: true,
    select: false,
  },
})


export const BlogModel = model ('Blog', blogSchema);
