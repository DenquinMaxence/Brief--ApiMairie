import { StatusCodes } from 'http-status-codes';
import {
	isDate,
	isTime,
	isPictureCloudinaryUrl,
	isEmail,
	isPostalCode,
	isPhoneNumber,
} from '../utils/isValid.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export default (req, res, next) => {
	let {
		typeReport,
		descReport,
		dateReport,
		timeReport,
		addressReport,
		pictureReport,
		lastName,
		firstName,
		email,
		address,
		city,
		postalCode,
		phone,
	} = req.body;

	const errors = [];

	if (!typeReport) errors.push('Please provide a type of report');
	else if (!ObjectId.isValid(typeReport)) errors.push('The type of report provided is invalid');

	if (!descReport) errors.push('Please provide a description of the report');
	else if (!(descReport.length > 0 && descReport.length <= 1024))
		errors.push('Description must be between 1 and 1024 characters');

	if (!dateReport) errors.push('Please provide the date of the report');
	else if (!isDate(dateReport)) errors.push('The date report provided is invalid');

	if (!timeReport) errors.push('Please provide the report time');
	else if (!isTime(timeReport)) errors.push('The time report provided is invalid');
	else {
		timeReport = timeReport.split(':');
		// Merge date and time to get a full date in one variable
		req.body.dateReport = new Date(new Date(dateReport).setHours(timeReport[0], timeReport[1]));

		// Just deleting the timeReport property from the req.body object
		delete req.body.timeReport;
	}

	if (!addressReport) errors.push('Please provide the report address');

	if (pictureReport && !isPictureCloudinaryUrl(pictureReport))
		errors.push('Invalid image URL link provided');

	if (!lastName) errors.push('Please provide your last name');
	else if (!(lastName.length >= 2 && lastName.length <= 50))
		errors.push('Last name must be between 2 and 50 characters');

	if (!firstName) errors.push('Please provide your first name');
	else if (!(firstName.length >= 2 && firstName.length <= 50))
		errors.push('First name must be between 2 and 50 characters');

	if (!email) errors.push('Please provide an email address');
	else if (!isEmail(email)) errors.push('The format of the email address provided is invalid');

	if (!address) errors.push('Please provide your address');

	if (!city) errors.push('Please provide your city name');

	if (!postalCode) errors.push('Please provide your postal code');
	else if (!isPostalCode(postalCode)) errors.push('The postal code provided is invalid');

	if (!phone) errors.push('Please provide a phone number');
	else if (!isPhoneNumber(phone))
		errors.push('The phone number provided does not follow the requested format');

	if (errors.length > 0) return res.status(StatusCodes.BAD_REQUEST).json({ errors });

	next();
};
