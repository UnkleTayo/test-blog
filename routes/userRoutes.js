const express = require('express');
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

const roles = ["user", "admin"]
router.patch('/updateMe', protect, restrictTo(...roles), userController.updateMe);
router.delete('/deleteMe', protect, restrictTo(...roles),userController.deleteMe);

router.get('/:id',protect, restrictTo(...roles), userController.getUser);
router.get('/', protect, restrictTo("admin"),userController.getAllUsers);

/**
 * Route to get post by a single user
 * Public
 * api/v1/user/post
 */
router.get('/me/:id/posts', userController.getUserPost);

router.route('/:id').get(userController.getUser);

// user sign.addRoutes()
module.exports = router;
