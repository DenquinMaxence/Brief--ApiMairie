import mongoose from 'mongoose';
import { isName } from '../utils/isValid.js';
const ObjectId = mongoose.Types.ObjectId;
import { StatusCodes } from 'http-status-codes';

export default (req, res, next) => {
	const { name, role } = req.body;
	const errors = [];

	if (!name) errors.push('Please provide a name');
	else if (!isName(name)) errors.push('Last name must be between 2 and 50 characters');

	if (!role) errors.push('Please provide a role');
	else if (!ObjectId.isValid(role)) errors.push('The role provided is invalid');

	if (errors.length > 0) return res.status(StatusCodes.BAD_REQUEST).json({ errors });

	next();
};
