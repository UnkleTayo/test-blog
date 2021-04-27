const expressAsyncHandler = require('express-async-handler');
const { Blog } = require('../models/blogModel.js');

exports.createPost = expressAsyncHandler(async (req, res) => {
  const blogData = req.body;

  const newBlogPost = new Blog({
    ...blogData,
    createdBy: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
