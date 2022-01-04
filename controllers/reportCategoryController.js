import categoryReportModel from '../models/categoryReportModel.js';
import roleModel from '../models/roleModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const getAllCategoryReports = async (req, res) => {
	try {
		const categoryReports = await categoryReportModel.find({}, '-__v');
		if (!categoryReports || categoryReports.length === 0)
			return res.status(StatusCodes.NOT_FOUND).send('No category reports found');

		res.status(StatusCodes.OK).send(categoryReports);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const getSingleCategoryReport = async (req, res) => {
	const { id } = req.params;

	if (!ObjectId.isValid(id))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${id}` });

	try {
		const categoryReport = await categoryReportModel.findById(id).select('-__v');
		if (!categoryReport)
			return res.status(StatusCodes.NOT_FOUND).send('Category report not found');

		res.status(StatusCodes.OK).send(categoryReport);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const createCategoryReport = async (req, res) => {
	try {
		const roleExist = await roleModel.findById(req.body.role).select('-__v');
		if (!roleExist) return res.status(StatusCodes.NOT_FOUND).send('Role not found');
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}

	try {
		const categoryReport = await categoryReportModel.create(req.body);
		if (!categoryReport)
			return res.status(StatusCodes.NOT_FOUND).send('Category Report not found');

		res.status(StatusCodes.CREATED).send(categoryReport);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const updateCategoryReport = async (req, res) => {
	const { id } = req.params;

	if (!ObjectId.isValid(id))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${id}` });

	try {
		const roleExist = await roleModel.findById(req.body.role).select('-__v');
		if (!roleExist) return res.status(StatusCodes.NOT_FOUND).send('Role not found');
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}

	try {
		const categoryReport = await categoryReportModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!categoryReport)
			return res.status(StatusCodes.NOT_FOUND).send('Category Report not found');

		res.status(StatusCodes.OK).send(categoryReport);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const deleteCategoryReport = async (req, res) => {
	const { id } = req.params;

	if (!ObjectId.isValid(id))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${id}` });

	try {
		const categoryReport = await categoryReportModel.findByIdAndDelete(id);
		if (!categoryReport)
			return res.status(StatusCodes.NOT_FOUND).send('Category Report not found');

		res.status(StatusCodes.OK).send(categoryReport);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
