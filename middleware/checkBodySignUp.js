import { StatusCodes } from 'http-status-codes';
import { isEmail, isLastName, isFirstName, isPassword } from '../utils/isValid.js';

export default (req, res, next) => {
	const { lastName, firstName, email, password } = req.body;

	const errors = [];

	if (!lastName) errors.push('Please provide your last name');
	else if (!isLastName(lastName)) errors.push('Last name must be between 2 and 50 characters');

	if (!firstName) errors.push('Please provide your first name');
	else if (!isFirstName(firstName)) errors.push('First name must be between 2 and 50 characters');

	if (!email) errors.push('Please provide your email');
	else if (!isEmail(email)) errors.push('The format of the email address provided is invalid');

	if (!password) errors.push('Please provide your password');
	else if (!isPassword(password)) errors.push('Password must be between 3 and 1024 characters');

	if (errors.length > 0) return res.status(StatusCodes.BAD_REQUEST).json({ errors });

	next();
};
