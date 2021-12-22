import userModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find({}, '-password -__v');
		if (!users || users.length === 0)
			return res.status(StatusCodes.NOT_FOUND).send('No users found');

		res.status(StatusCodes.OK).send(users);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const getSingleUser = async (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${req.params.id}` });

	try {
		const user = await userModel.findById(req.params.id).select('-password -__v');
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

		res.status(StatusCodes.OK).send(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

// Update user
export const updateUser = async (req, res) => {
	const userId = req.params.id || req.user?._id;
	
	if (!ObjectId.isValid(userId))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${userId}` });

	try {
		const user = await userModel
			.findByIdAndUpdate(
				userId,
				{
					$set: {
						...req.body,
					},
				},
				{ new: true, setDefaultsOnInsert: true }
			)
			.select('-password -__v');
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

		res.status(StatusCodes.OK).send(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

// Delete user
export const deleteUser = async (req, res) => {
	const userId = req.params.id || req.user?._id;

	if (!ObjectId.isValid(userId))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${userId}` });

	try {
		const user = await userModel.findById(userId).select('-password -__v');
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

		await user.remove();
		res.status(StatusCodes.OK).send(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
