import { StatusCodes } from 'http-status-codes';
import {
	isTypeReport,
	isDate,
	isTime,
	isPictureCloudinaryUrl,
	isEmail,
	isPostalCode,
	isPhoneNumber,
} from '../utils/isValid.js';

export default function checkBodyReport(req, res, next) {
	let {
		typeReport,
		descReport,
		dateReport,
		timeReport,
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

	const errors = [];

	if (!typeReport) errors.push('Type report is required');
	else if (!isTypeReport(typeReport)) errors.push('Type report is invalid');

	if (!descReport) errors.push('Description report is required');
	else if (!(descReport.length > 0 && descReport.length <= 1024))
		errors.push('Description must be between 1 and 1024 characters');

	if (!dateReport) errors.push('Date report is required');
	else if (!isDate(dateReport)) errors.push('Date report is not valid');

	if (!timeReport) errors.push('Time report is required');
	else if (!isTime(timeReport)) errors.push('Time report is not valid');
	else {
		timeReport = timeReport.split(':');
		req.body.dateReport = new Date(new Date(dateReport).setHours(timeReport[0], timeReport[1]));
	}

	if (!addressReport) errors.push('Address report is required');

	if (!pictureReport) errors.push('Picture report is required');
	else if (!isPictureCloudinaryUrl(pictureReport)) errors.push('Picture report is not valid');

	if (!lastNameSender) errors.push('Last name sender is required');
	else if (!(lastNameSender.length >= 2 && lastNameSender.length <= 50))
		errors.push('Last name sender is invalid');

	if (!firstNameSender) errors.push('First name sender is required');
	else if (!(firstNameSender.length >= 2 && firstNameSender.length <= 50))
		errors.push('First name sender is invalid');

	if (!emailSender) errors.push('Email sender is required');
	else if (!isEmail(emailSender)) errors.push('Email sender format is not valid');

	if (!addressSender) errors.push('Address sender is required');

	if (!citySender) errors.push('City sender is required');

	if (!postalSender) errors.push('Postal sender is required');
	else if (!isPostalCode(postalSender)) errors.push('Postal sender is not valid');

	if (!phoneSender) errors.push('Phone sender is required');
	else if (!isPhoneNumber(phoneSender)) errors.push('Phone sender is not valid');

	if (errors.length > 0) return res.status(StatusCodes.BAD_REQUEST).json({ errors });

	next();
}
