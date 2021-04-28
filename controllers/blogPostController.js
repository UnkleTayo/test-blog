const expressAsyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');

exports.createPost = expressAsyncHandler(async (req, res, next) => {
  const blogData = req.body;

  const newBlogPost = await Blog.create({
    ...blogData,
    createdBy: req.userId,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  });
  res.status(201).json({
    message: 'success',
    data: { post: newBlogPost },
  });
});
