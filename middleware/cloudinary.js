import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPicture = async (req, res, next) => {
	const file = req.files || null;
	console.log('reqfile -> ', file);

	const { mimetype } = file;
	if (mimetype !== 'image/png' && mimetype !== 'image/jpg' && mimetype !== 'image/jpeg')
		return next(null, false);

    next(null, true);
	// try {
	// 	const result = await cloudinary.uploader.upload(req.file);
	// 	return next(null, result);
	// } catch (error) {
	// 	console.log('error -> ', error);
	// 	return next(error);
	// }
};
