import { Router } from 'express';
const router = Router();
import {
	getAllUsers,
	updateUser,
	deleteUser,
	getSingleUser,
} from '../controllers/userController.js';

// Manage user
router.get('/', getAllUsers); // Get all users (admin only)
router.get('/:id', getSingleUser); // Get user (admin only)
router.put('/:id', updateUser); // Update user (admin only)
router.delete('/:id', deleteUser); // Delete user (admin only)

export default router;
