import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
	/**
	 * @description Type of report
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "highways"
	 * "parking"
	 * "works"
	 * "other"
	 */
	type: {
		type: String,
		enum: ['highways', 'parking', 'works', 'other'],
		match: /^(highways|parking|works|other)$/,
		required: true,
	},
	/**
	 * @description Description of the report
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "Renault Kadjar White model vehicle in awkward parking lot"
	 */
	description: {
		type: String,
		max: 1024,
		required: true,
	},
	/**
	 * @description Date of the report
	 * @type {Date}
	 * @memberof reportSchema
	 * @example
	 * "01/01/1991"
	 */
	date: {
		type: Date,
		match: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
		required: true,
	},
	/**
	 * @description Hour of the report
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "12:30"
	 */
	time: {
		type: String,
		match: /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
		required: true,
	},
	/**
	 * @description Address of the report
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "Rue des Prés, 75001 Paris"
	 */
	addressReport: {
		type: String,
		required: true,
	},
	/**
	 * @description Picture of the report
	 * @type {String}
	 * @memberof reportSchema
	 */
	photo: {
		type: String,
		required: true,
	},
	/**
	 * @description Lastname of the sender
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "Dupont"
	 */
	lastName: {
		type: String,
		minlength: 2,
		maxlength: 50,
		required: [true, 'Merci de fournir un nom'],
	},
	/**
	 * @description Firstname of the sender
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "John"
	 */
	firstName: {
		type: String,
		minlength: 2,
		maxlength: 50,
		required: [true, 'Merci de fournir un prénom'],
	},
	/**
	 * @description Email of the sender
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "dupont.john@gmail.com"
	 */
	email: {
		type: String,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Merci de fournir un email valide',
		],
		unique: true,
		required: [true, 'Merci de fournir un email'],
	},
	/**
	 * @description Adress of the sender
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "Rue des Prés, 75001 Paris"
	 */
	address: {
		type: String,
		required: [true, 'Please provide an address'],
	},
	/**
	 * @description City of the sender
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "Paris"
	 */
	city: {
		type: String,
		required: [true, 'Please provide a city name'],
	},
	/**
	 * @description Postal code of the sender
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "75001"
	 */
	postalCode: {
		type: String,
		required: [true, 'Please provide a postal code'],
		match: [/^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/, 'Please provide a valid postal code'],
	},
	/**
	 * @description Phone number of the sender
	 * @type {String}
	 * @memberof reportSchema
	 * @example
	 * "0655555555"
	 * // or
	 * "06.55.55.55.55"
	 */
	phone: {
		type: String,
		required: [true, 'Please provide a phone number'],
		match: [/^0[1-9]([-. ]?[0-9]{2}){4}$/, 'Please provide a valid phone number'],
	},
});

export default mongoose.model('Report', reportSchema);
