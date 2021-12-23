import { StatusCodes } from 'http-status-codes';
export default (req, res, next) => {
	if (!req.user)
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send('You must be authenticated to perform this action');

	next();
};
