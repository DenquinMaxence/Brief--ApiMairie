import roleModel from '../models/roleModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Middleware to check if the user is an admin
export default async (req, res, next) => {
	if (!ObjectId.isValid(req.user?.role))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user?.role}`);

	try {
		const role = await roleModel.findById(req.user.role);
		if (role.name === 'ROLE_ADMIN' || role.name === 'ROLE_SUPER_ADMIN') next();
		else {
			return res
				.status(StatusCodes.FORBIDDEN)
				.send('You are not authorized to perform this action');
		}
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
