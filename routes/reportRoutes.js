import { Router } from 'express';
import { uploadPicture } from '../middleware/cloudinary.js';
import { getAllReports, createReport } from '../controllers/reportController.js';

const router = Router();

router.get('/', getAllReports).post('/', uploadPicture, createReport);

export default router;
