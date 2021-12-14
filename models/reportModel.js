import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
	{
		/**
		 * @description Type of report
		 * @type {String}
		 * @memberof reportSchema
		 * @example
		 * "highways"
		 * "parking"
		 * "works"
		 * "animals"
		 * "other"
		 */
		type: {
			type: String,
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
		 * "1991-01-01"
		 */
		date: {
			type: Date,
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
		picture: {
			type: String,
			default: '',
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
			required: [true, 'Merci de fournir un email'],
		},
		/**
		 * @description Adress of the sender
		 * @type {String}
		 * @memberof reportSchema
		 * @example
		 * "33 Blvd du Général Leclerc"
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
		 * "Roubaix"
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
		 * "59100"
		 */
		postalCode: {
			type: String,
			required: [true, 'Please provide a postal code'],
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
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Report', reportSchema);
