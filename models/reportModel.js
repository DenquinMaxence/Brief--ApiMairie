import mongoose from 'mongoose';

/* 
	Un champ pour choisir le type d'alerte (voirie, stationnement, travaux, etc...)
	Un champ pour décrire l'alerte (Textarea)
	Un champ date
	un champ horaires
	Un champ pour l'adresse sous forme de carte interactive (Google Maps) avec possibilité de géolocalisation
	Un champ photo (caméra smartphone)
	Champ classique :
		- Nom
		- Prénom
		- Email
		- Adresse
		- Ville
		- Code postal
		- Téléphone
*/
const reportSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		enum: ['voirie', 'stationnement', 'travaux', 'autre'],
	},
	description: {
		type: String,
		max: 1024,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	addressReport: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		minlength: 2,
		maxlength: 50,
		required: [true, 'Merci de fournir un nom'],
	},
	firstName: {
		type: String,
		minlength: 2,
		maxlength: 50,
		required: [true, 'Merci de fournir un prénom'],
	},
	email: {
		type: String,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Merci de fournir un email valide',
		],
		unique: true,
		required: [true, 'Merci de fournir un email'],
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	postalCode: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Report', reportSchema);
