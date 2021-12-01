import { Router } from 'express';
import checkBodyReport from '../utils/checkBodyReport.js';
import { uploadPicture } from '../middleware/cloudinary.js';
import { selectAllReports, createReport } from '../controllers/reportController.js';

const router = Router();

router.get('/', selectAllReports).post('/', uploadPicture, checkBodyReport, createReport);

export default router;
