const express = require('express');
const postController = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create post
// router.get('/:id', findUserPosts);
router.route('/').get(postController.getAllPosts);
router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.route('/new').post(protect, postController.createPost);

module.exports = router;

// router.post("/new", auth.verifyToken, postsController.newposts)
// router.get("/list", postsController.listpostss)
// router.get("/:id", postsController.findposts)
// router.put("/:id/edit", postsController.updateposts)
// router.delete("/:id/delete", postsController.deleteposts)
