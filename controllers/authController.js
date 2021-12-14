import userModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';

export const signUp = async (req, res) => {
	try {
		const user = await userModel.create(req.body);
		res.status(StatusCodes.CREATED).json(user);
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json(error);
	}
};

export const signIn = async (req, res) => {
	try {
		const user = await userModel.findOne({ email: req.body.email });
		if (!user) res.status(StatusCodes.NOT_FOUND).json({ message: 'Utilisateur non trouvé' });

		const isPasswordValid = await user.comparePassword(req.body.password);
		if (!isPasswordValid)
			res.status(StatusCodes.NOT_FOUND).json({ message: 'Mot de passe invalide' });

		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json(error);
	}
};

export const signOut = async (req, res) => {
	try {
		res.status(StatusCodes.OK).json({ message: 'Déconnexion réussie' });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json(error);
	}
};
