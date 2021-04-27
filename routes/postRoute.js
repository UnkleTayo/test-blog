const express = require('express');
const { createPost } = require('../controllers/postController');
const { protect }  = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create post
router.post('/new', protect, createPost);
module.exports = router;
