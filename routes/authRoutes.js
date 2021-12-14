import { Router } from 'express';
const router = Router();
import { signUp, signIn, signOut } from '../controllers/authController';

// Sign up
router.post('/register', signUp);

// Sign in
router.post('/login', signIn);

// Sign out
router.get('/logout', signOut);

export default router;
