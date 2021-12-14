import { Router } from 'express';
import checkBodyReport from '../utils/checkBodyReport.js';
import uploadPicture from '../middleware/cloudinary.js';
import { createReport } from '../controllers/reportController.js';

const router = Router();

router.post('/', uploadPicture, checkBodyReport, createReport);

export default router;
