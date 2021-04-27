import express from 'express';
import { signup, signin } from '../controllers/authController.js';
import { validateMiddleware,  validateUserOnSignIn } from './schema.js';


const router = express.Router();

// register a user
router.post('/auth/signup', signup);

// user sign in route
router.post('/auth/signin', [validateMiddleware(validateUserOnSignIn), signin]);

export default router;