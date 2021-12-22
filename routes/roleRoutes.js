import { Router } from 'express';
const router = Router();
import checkBodyRole from '../middleware/checkBodyRole.js';
import { getAllRoles, createRole, updateRole, deleteRole } from '../controllers/roleController.js';

// api/v1/role/
router.get('/', getAllRoles).post('/', checkBodyRole, createRole);

// api/v1/role/:id
router.put('/:id', checkBodyRole, updateRole).delete('/:id', deleteRole);

export default router;