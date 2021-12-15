import userModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';

export const signUp = async (req, res) => {
	try {
		const user = await userModel.create(req.body);
		res.status(StatusCodes.CREATED).send(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });
		if (!user) res.status(StatusCodes.BAD_REQUEST).send('Invalid email');

		const isMatch = await user.comparePassword(password);
		if (!isMatch) res.status(StatusCodes.BAD_REQUEST).send('Invalid password');

		const token = await user.generateJWT();
		res.status(StatusCodes.OK).send(token);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const signOut = async (req, res) => {
	try {
		res.status(StatusCodes.OK).send('Déconnexion réussie');
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
