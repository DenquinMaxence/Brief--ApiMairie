import { Router } from 'express';
import { getAllReports } from '../controllers/reportController.js';

const router = Router();

router.get('/', getAllReports);

export default router;
