import { Router } from 'express';
const router = Router();
import {
	getAllUsers,
	updateUser,
	deleteUser,
	getSingleUser,
} from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

// api/v1/users/
router.get('/', getAllUsers).put('/', verifyToken, updateUser).delete('/', verifyToken, deleteUser);

// api/v1/users/:id
router.get('/:id', getSingleUser).put('/:id', updateUser).delete('/:id', deleteUser); // admin only

export default router;
