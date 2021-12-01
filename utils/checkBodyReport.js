import { StatusCodes } from 'http-status-codes';

export default function checkBodyReport(req, res, next) {
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

	const typeOfReport = ['highways', 'parking', 'works', 'other'];
	if (!typeReport && !typeOfReport.includes(typeReport))
		return res.status(StatusCodes.BAD_REQUEST).send('Type report is required');

	if (!descReport)
		return res.status(StatusCodes.BAD_REQUEST).send('Description report is required');

	if (!(descReport.length > 0 && descReport.length <= 1024))
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send('Description must be between 1 and 1024 characters');

	if (!dateReport) return res.status(StatusCodes.BAD_REQUEST).send('Date report is required');

	console.log(timeReport.split(':'));
	let dateTimestamp = new Date(dateReport).setHours(16, 20);
	dateTimestamp = new Date(dateTimestamp);
	console.log(dateTimestamp);
	// if (!dateReport.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/))
	// return res.status(StatusCodes.BAD_REQUEST).send('Date report must be in format dd/mm/yyyy');

	next();
}
