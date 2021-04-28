const express = require('express');
const authController = require('../controllers/authController');
const { validateMiddleware, validateUserOnSignIn } = require('./schema');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/:id/lists', authController.getUserPost);
// user sign in route
router.post('/login', [
  validateMiddleware(validateUserOnSignIn),
  authController.login,
]);

module.exports = router;
