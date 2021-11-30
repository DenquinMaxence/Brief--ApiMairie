import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

export const uploadPicture = (req, res, next) => {
	// Get the file name and extension with multer
	const storage = multer.diskStorage({
		filename: (req, file, cb) => {
			const fileExt = file.originalname.split('.').pop();
			const fileName = `${new Date().getTime()}.${fileExt}`;
			cb(null, fileName);
		},
	});

	// Filter the file to validate if it meets the required image extension
	const fileFilter = (req, file, cb) => {
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg'
		) {
			cb(null, true);
		} else {
			cb(
				{
					message: 'File type not supported',
				},
				false
			);
		}
	};

	// Initialize multer with the storage, file filter and file size
	const upload = multer({
		storage,
		limits: {
			fieldNameSize: 200,
			fileSize: 5 * 1024 * 1024,
		},
		fileFilter,
	}).single('pictureReport');

	// Upload the file to cloudinary
	upload(req, res, async (err) => {
		if (err) return res.status(409).send(err.message);

		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		if (!req.file) return res.status(404).send('No file found, please upload a file');

		const { path } = req.file; // Get the path of the file
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
			return res.status(409).send(error.message);
		}
	});
};
