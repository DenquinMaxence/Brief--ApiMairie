import multer from 'multer';

/**
 * Allows you to check the file type of the uploaded file.
 *
 * @param {String} inputFileName Insert input file name declared in the form, default value is ```pictureReport```
 * @return {InstanceType} Returns the multer instance
 */
export default (inputFileName = 'pictureReport') => {
	// Get the file name and extension with multer
	const storage = multer.diskStorage({
		filename: (req, file, cb) => {
			const fileExt = file.originalname.split('.').pop();
			const fileName = `${new Date().getTime()}.${fileExt}`;
			cb(null, fileName);
		},
	});

	// Filter the file to validate if it meets the required extension
	const fileFilter = (req, file, cb) => {
		let checkType;
		// Check if the file is an image
		if (inputFileName === 'pictureReport') checkType = ['image/png', 'image/jpg', 'image/jpeg'];
		// Else return an error
		else cb({ message: 'Wrong input file name' }, false);

		// Check if the extension is valid
		if (checkType.includes(file.mimetype)) cb(null, true);
		// Else return an error
		else cb({ message: 'File type not supported' }, false);
	};

	// Initialize multer with the storage, file filter and file size
	return multer({
		storage,
		limits: {
			fieldNameSize: 200,
			fileSize: 5 * 1024 * 1024,
		},
		fileFilter,
	}).single(inputFileName);
}
