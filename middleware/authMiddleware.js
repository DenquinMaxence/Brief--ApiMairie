import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export default (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) return res.status(StatusCodes.UNAUTHORIZED).send('No token provided.');

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decodedToken;
		next();
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
	}
};
