const express = require('express');
const authController = require('../controllers/authController');
const { validateMiddleware, validateUserOnSignIn } = require('./schema');

const router = express.Router();

router.post('/signup', authController.signup);
// user sign in route
router.post('/login', [
  validateMiddleware(validateUserOnSignIn),
  authController.login,
]);

router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/:id/lists', authController.getUserPost);
module.exports = router;
