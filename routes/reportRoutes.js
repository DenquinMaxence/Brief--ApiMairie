import { Router } from 'express';
import checkBodyReport from '../middleware/checkBodyReport.js';
import uploadPicture from '../middleware/cloudinary.js';
import { createReport } from '../controllers/reportController.js';
import checkBodyReportCategory from '../middleware/checkBodyReportCategory.js';
import {
	getAllCategoryReports,
	getSingleCategoryReport,
	createCategoryReport,
	deleteCategoryReport,
	updateCategoryReport,
} from '../controllers/reportCategoryController.js';

const router = Router();

// api/v1/reports/
router.post('/', uploadPicture, checkBodyReport, createReport);

// api/v1/reports/category
router
	.get('/category', getAllCategoryReports)
	.post('/category', checkBodyReportCategory, createCategoryReport);

// api/v1/reports/category/:id
router
	.get('/category/:id', getSingleCategoryReport)
	.put('/category/:id', checkBodyReportCategory, updateCategoryReport)
	.delete('/category/:id', deleteCategoryReport);

export default router;
