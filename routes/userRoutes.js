const express  = require('express');
const { signup, login }  = require ('../controllers/userController');
const  { validateMiddleware,  validateUserOnSignIn } = require('./schema');


const router = express.Router();

// register a user
router.post('/signup', signup);
// user sign in route
router.post('/login', [validateMiddleware(validateUserOnSignIn), login]);

module.exports = router;
