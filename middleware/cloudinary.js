import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import checkFile from '../utils/multer.js';
import { v2 as cloudinary } from 'cloudinary';
import { StatusCodes } from 'http-status-codes';

export const uploadPicture = (req, res, next) => {
	const multerResult = checkFile('pictureReport');

	// Upload the file to cloudinary
	multerResult(req, res, async (err) => {
		if (err) return res.status(StatusCodes.CONFLICT).send(err.message);

		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		if (!req.file)
			return res.status(StatusCodes.NOT_FOUND).send('No file found, please upload a file');

		// Get the path of the file
		const { path } = req.file;
		try {
			const result = await cloudinary.uploader.upload(path, {
				upload_preset: 'brief_apimairie',
				resource_type: 'image',
			});

			// Delete the file from the server
			fs.unlinkSync(path);

			// Pass the url of the picture to the next middleware
			req.body.pictureReport = result.secure_url;
			// Make req.file undefined to avoid multer to save the file in the server
			req.file = undefined;

			// Go to the next middleware
			next();
		} catch (error) {
			return res.status(StatusCodes.CONFLICT).send(error.message);
		}
	});
};
