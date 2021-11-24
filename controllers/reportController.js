import reportModel from '../models/reportModel.js';
import { StatusCodes } from 'http-status-codes';

export async function getAllReports(req, res) {
	const reports = await reportModel.find();
	res.status(StatusCodes.OK).json({ reports });
}
