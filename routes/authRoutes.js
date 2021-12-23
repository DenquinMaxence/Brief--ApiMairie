import { Router } from 'express';
const router = Router();
import { checkBodySignUp, verifyToken, isAuthenticated } from '../middleware/index.js';
import { signUp, signIn, getMe, signOut } from '../controllers/authController.js';

// Auth user
router.post('/register', checkBodySignUp, signUp);
router.post('/login', signIn);
router.get('/logout', verifyToken, isAuthenticated, signOut);

// Get user info
router.post('/me', verifyToken, isAuthenticated, getMe);

export default router;
