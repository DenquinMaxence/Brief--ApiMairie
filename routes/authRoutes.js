import { Router } from 'express';
const router = Router();
import { signUp, signIn, signOut } from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

// Sign up
router.post('/register', signUp);

// Sign in
router.post('/login', signIn);

// Sign out
router.get('/logout', verifyToken, signOut);

export default router;
