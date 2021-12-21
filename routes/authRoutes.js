import { Router } from 'express';
const router = Router();
import checkBodySignUp from '../middleware/checkBodySignUp.js';
import { signUp, signIn, getMe, signOut } from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

// Sign up
router.post('/register', checkBodySignUp, signUp);

// Sign in
router.post('/login', signIn);

// Get user info
router.post('/me', verifyToken, getMe);

// Sign out
router.get('/logout', verifyToken, signOut);

export default router;
