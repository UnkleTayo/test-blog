const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/updateMe', protect, userController.updateMe);
router.delete('/deleteMe', protect, userController.deleteMe);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// user sign.addRoutes()
module.exports = router;
