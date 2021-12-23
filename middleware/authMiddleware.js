import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				req.user = null;
				res.clearCookie('jwt');
			} else {
				const user = await userModel.findById(decodedToken._id).select('email role');
				if (!user) {
					req.user = null;
					res.clearCookie('jwt');
				}

				req.user = user;
			}
			next();
		});
	} else {
		req.user = null;
		next();
	}
};
