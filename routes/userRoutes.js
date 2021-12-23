import { Router } from 'express';
const router = Router();
import {
	getAllUsers,
	updateUser,
	deleteUser,
	getSingleUser,
} from '../controllers/userController.js';
import { isAdmin } from '../middleware/index.js';

// api/v1/users/
router.get('/', isAdmin, getAllUsers); // admin only

// api/v1/users/:id
router
	.get('/:id', isAdmin, getSingleUser) // admin only
	.put('/:id', updateUser)
	.delete('/:id', deleteUser);

export default router;
