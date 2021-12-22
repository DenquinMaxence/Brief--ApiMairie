import { StatusCodes } from 'http-status-codes';
import { isRole } from '../utils/isValid.js';

export default (req, res, next) => {
	const { name } = req.body;
	const errors = [];

	if (!name) errors.push('Please provide a role name');
	else if (!isRole(name)) errors.push('The role name provided is invalid');

	if (errors.length > 0) return res.status(StatusCodes.BAD_REQUEST).json({ errors });

	next();
};
