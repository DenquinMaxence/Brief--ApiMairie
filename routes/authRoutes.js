import { Router } from 'express';
const router = Router();
import checkBodySignUp from '../utils/checkBodySignUp.js';
import { signUp, signIn, signOut } from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

// Sign up
router.post('/register', checkBodySignUp, signUp);

// Sign in
router.post('/login', signIn);

// Sign out
router.get('/logout', verifyToken, signOut);

export default router;
