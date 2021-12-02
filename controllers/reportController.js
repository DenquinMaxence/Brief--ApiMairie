import reportModel from '../models/reportModel.js';
import { StatusCodes } from 'http-status-codes';

export const selectAllReports = async (req, res) => {
	const reports = await reportModel.find();
	res.status(StatusCodes.OK).json({ reports });
};

export const createReport = async (req, res) => {
	const {
		typeReport,
		descReport,
		dateReport,
		addressReport,
		pictureReport,
		lastNameSender,
		firstNameSender,
		emailSender,
		addressSender,
		citySender,
		postalSender,
		phoneSender,
	} = req.body;

	try {
		const report = await reportModel.create({
			type: typeReport,
			description: descReport,
			date: dateReport,
			addressReport,
			picture: pictureReport,
			lastName: lastNameSender,
			firstName: firstNameSender,
			email: emailSender,
			address: addressSender,
			city: citySender,
			postalCode: postalSender,
			phone: phoneSender,
		});

		res.status(StatusCodes.CREATED).send(report._id);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
