import roleModel from '../models/roleModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllRoles = async (req, res) => {
	try {
		const roles = await roleModel.find({}, '-__v');
		if (!roles || roles.length === 0)
			return res.status(StatusCodes.NOT_FOUND).send('No roles found');

		res.status(StatusCodes.OK).send(roles);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const getSingleRole = async (req, res) => {
	const { id } = req.params;

	if (!ObjectId.isValid(id))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${id}` });

	try {
		const role = await roleModel.findById(id).select('-__v');
		if (!role) return res.status(StatusCodes.NOT_FOUND).send('Role not found');

		res.status(StatusCodes.OK).send(role);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const createRole = async (req, res) => {
	try {
		const role = await roleModel.create(req.body);
		if (!role) return res.status(StatusCodes.NOT_FOUND).send('Role not found');

		res.status(StatusCodes.OK).send(role);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const updateRole = async (req, res) => {
	const { id } = req.params;

	if (!ObjectId.isValid(id))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${id}` });

	try {
		const role = await roleModel.findByIdAndUpdate(id, req.body, { new: true });
		if (!role) return res.status(StatusCodes.NOT_FOUND).send('Role not found');

		res.status(StatusCodes.OK).send(role);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const deleteRole = async (req, res) => {
	const { id } = req.params;

	if (!ObjectId.isValid(id))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${id}` });

	try {
		const role = await roleModel.findByIdAndDelete(id);
		if (!role) return res.status(StatusCodes.NOT_FOUND).send('Role not found');

		res.status(StatusCodes.OK).send(role);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
