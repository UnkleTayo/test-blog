const express = require('express');
const { createPost } = require('../controllers/blogPostController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create post
router.post('/new', protect, createPost);
module.exports = router;
