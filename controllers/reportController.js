import reportModel from '../models/reportModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllReports = async (req, res) => {
	const reports = await reportModel.find();
	res.status(StatusCodes.OK).json({ reports });
};

export const createReport = async (req, res) => {
	console.log(req.body);
	try {
		const report = await reportModel.create({ ...req.body });
		res.status(StatusCodes.CREATED).send(report._id);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
