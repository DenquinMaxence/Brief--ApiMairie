import reportModel from '../models/reportModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllReports = async (req, res) => {
	const reports = await reportModel.find();
	res.status(StatusCodes.OK).json({ reports });
};

export const createReport = async (req, res) => {
	console.log('body ->', req.body);

	/* try {
		const {
			typeReport,
			descReport,
			dateReport,
			timeReport,
			latReport,
			lngReport,
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

		const report = await reportModel.create({
			type: typeReport,
			description: descReport,
			date: dateReport,
			time: timeReport,
			addressReport: addressReport || `${latReport}, ${lngReport}`,
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
	} */
};
