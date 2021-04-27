import express from 'express';
import { signup, signin } from '../controllers/userController.js';


const router = express.Router();

// register a user
router.post('/auth/signup', signup);

// user sign in route
router.post('/auth/signin', signin);

export default router;