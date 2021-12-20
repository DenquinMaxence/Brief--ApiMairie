export const isTypeReport = (value) => {
	const typeOfReport = process.env.REPORT_TYPES.split(', ');
	return typeOfReport.includes(value);
};

export const isDate = (value) => {
	// Date validation Regex with format yyyy-mm-dd
	const REGEX_DATE = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

	return REGEX_DATE.test(value);
};

export const isTime = (value) => {
	// Time validation Regex with format hh:mm
	const REGEX_TIME = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

	return REGEX_TIME.test(value);
};

export const isPictureCloudinaryUrl = (value) => {
	// Picture URL Cloudinary validation Regex with format https://res.cloudinary.com/<cloud_name>/image/upload/<folder>/<filename>
	const REGEX_PICTURE_CLOUDINARY_URL =
		/^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

	return REGEX_PICTURE_CLOUDINARY_URL.test(value);
};

export const isLastName = (value) => {
	return value.length >= 2 && value.length <= 50;
};

export const isFirstName = (value) => isLastName(value);

export const isPassword = (value) => {
	return value.length >= 3 && value.length <= 1024;
};

export const isEmail = (value) => {
	// Email validation Regex with format
	const REGEX_EMAIL =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return REGEX_EMAIL.test(value);
};

export const isPostalCode = (value) => {
	// Postal code validation Regex with format
	const REGEX_POSTAL_CODE = /^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/;
	return REGEX_POSTAL_CODE.test(value);
};

export const isPhoneNumber = (value) => {
	// Phone number validation Regex with format
	const REGEX_PHONE_NUMBER = /^0[1-9]([-. ]?[0-9]{2}){4}$/;
	return REGEX_PHONE_NUMBER.test(value);
};
