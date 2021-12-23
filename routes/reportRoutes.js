import { Router } from 'express';
import { checkBodyReport, uploadPicture, checkBodyReportCategory } from '../middleware/index.js';
import { createReport, deleteReport } from '../controllers/reportController.js';
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

// api/v1/reports/:id
router.delete('/:id', deleteReport);

// api/v1/reports/category
router
	.get('/category', getAllCategoryReports)
	.post('/category', checkBodyReportCategory, createCategoryReport); // admin only

// api/v1/reports/category/:id
router
	.get('/category/:id', getSingleCategoryReport) // admin only
	.put('/category/:id', checkBodyReportCategory, updateCategoryReport) // admin only
	.delete('/category/:id', deleteCategoryReport); // admin only

export default router;
