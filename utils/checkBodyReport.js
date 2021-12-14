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

export default (req, res, next) => {
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

	if (!typeReport) errors.push('Please provide a type of report');
	else if (!isTypeReport(typeReport)) errors.push('The type of report provided is invalid');

	if (!descReport) errors.push('Please provide a description of the report');
	else if (!(descReport.length > 0 && descReport.length <= 1024))
		errors.push('Description must be between 1 and 1024 characters');

	if (!dateReport) errors.push('Please provide the date of the report');
	else if (!isDate(dateReport)) errors.push('The date report provided is invalid');

	if (!timeReport) errors.push('Please provide the report time');
	else if (!isTime(timeReport)) errors.push('The time report provided is invalid');
	else {
		timeReport = timeReport.split(':');
		req.body.dateReport = new Date(new Date(dateReport).setHours(timeReport[0], timeReport[1]));
	}

	if (!addressReport) errors.push('Please provide the report address');

	if (pictureReport && !isPictureCloudinaryUrl(pictureReport)) errors.push('Invalid image URL link provided');

	if (!lastNameSender) errors.push('Please provide your last name');
	else if (!(lastNameSender.length >= 2 && lastNameSender.length <= 50))
		errors.push('Last name must be between 2 and 50 characters');

	if (!firstNameSender) errors.push('Please provide your first name');
	else if (!(firstNameSender.length >= 2 && firstNameSender.length <= 50))
		errors.push('First name must be between 2 and 50 characters');

	if (!emailSender) errors.push('Please provide an email address');
	else if (!isEmail(emailSender))
		errors.push('The format of the email address provided is invalid');

	if (!addressSender) errors.push('Please provide your address');

	if (!citySender) errors.push('Please provide your city name');

	if (!postalSender) errors.push('Please provide your postal code');
	else if (!isPostalCode(postalSender)) errors.push('The postal code provided is invalid');

	if (!phoneSender) errors.push('Please provide a phone number');
	else if (!isPhoneNumber(phoneSender))
		errors.push('The phone number provided does not follow the requested format');

	if (errors.length > 0) return res.status(StatusCodes.BAD_REQUEST).json({ errors });

	next();
}
