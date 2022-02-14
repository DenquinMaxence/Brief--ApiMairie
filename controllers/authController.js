import userModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import roleModel from '../models/roleModel.js';
const ObjectId = mongoose.Types.ObjectId;

// Register
export const signUp = async (req, res) => {
	try {
		const emailAlreadyExists = await userModel.findOne({ email: req.body.email });
		if (emailAlreadyExists)
			return res.status(StatusCodes.BAD_REQUEST).send('Email already exists');
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}

	const isFirstAccount = (await userModel.countDocuments({})) === 0;
	let role;
	if (isFirstAccount) {
		const superAdminRole = await roleModel.findOne({ name: 'ROLE_SUPER_ADMIN' });
		if (!superAdminRole)
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send('Role not found for first account creation');

		role = superAdminRole._id;
	} else {
		const userRole = await roleModel.findOne({ name: 'ROLE_USER' });
		if (!userRole)
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send('Role not found for account creation');

		role = userRole._id;
	}

	try {
		const user = await userModel.create({ ...req.body, role });
		res.status(StatusCodes.CREATED).send(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

// login
export const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });
		if (!user) res.status(StatusCodes.BAD_REQUEST).send('Invalid email');

		const isMatch = await user.matchPassword(password);
		if (!isMatch) res.status(StatusCodes.BAD_REQUEST).send('Invalid password');

		const token = await user.generateJWT();

		// Set cookie
		res.cookie(process.env.JWT_COOKIE_NAME, token, {
			httpOnly: true,
			maxAge: Number(process.env.JWT_COOKIE_MAX_AGE),
		});

		res.status(StatusCodes.OK).send(token);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

// Get user info
export const getMe = async (req, res) => {
	if (!ObjectId.isValid(req.user?._id))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user?._id}`);

	try {
		const user = await userModel.findById(req.user._id).select('-password -__v');
		if (!user) return res.status(StatusCodes.BAD_REQUEST).send('User not found');

		res.status(StatusCodes.OK).send(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

// Sign out
export const signOut = (req, res) => {
	try {
		res.clearCookie(process.env.JWT_COOKIE_NAME);
		res.status(StatusCodes.OK).send('Sign out success');
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
