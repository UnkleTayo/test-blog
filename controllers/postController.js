const expressAsyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

const AppError = require('../utils/appErrorHandler');

exports.createPost = expressAsyncHandler(async (req, res, next) => {
  const postData = req.body;

  const post = await Post.create({
    ...postData,
    author: req.user._id,
    createdAt: Date.now(),
  });
  res.status(201).json({
    message: 'success',
    data: { post },
  });
});

exports.getAllPosts = expressAsyncHandler(async (req, res, next) => {
  const posts = await Post.find({});
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPost = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const post = await Post.findById(id);
  if (!post) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.updatePost = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.deletePost = expressAsyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
