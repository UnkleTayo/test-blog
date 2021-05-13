const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/updateMe', protect, userController.updateMe);
router.delete('/deleteMe', protect, userController.deleteMe);
router
  .route('/')
  .post(userController.createUser)
  .get(userController.getUser)
  .get(userController.getAllUsers);

/**
 * Route to get post by a single user
 * Public
 * api/v1/user/post
 */
router.get('/me/posts', userController.getUserPost);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// user sign.addRoutes()
module.exports = router;
