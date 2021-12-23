import { Router } from 'express';
const router = Router();
import checkBodyRole from '../middleware/checkBodyRole.js';
import isAdmin from '../middleware/isAdmin.js';
import {
	getAllRoles,
	createRole,
	updateRole,
	deleteRole,
	getSingleRole,
} from '../controllers/roleController.js';

// api/v1/role/
router
	.get('/', isAdmin, getAllRoles) // admin only
	.post('/', isAdmin, checkBodyRole, createRole); // admin only

// api/v1/role/:id
router
	.get('/:id', isAdmin, getSingleRole) // admin only
	.put('/:id', isAdmin, checkBodyRole, updateRole) // admin only
	.delete('/:id', isAdmin, deleteRole); // admin only

export default router;
