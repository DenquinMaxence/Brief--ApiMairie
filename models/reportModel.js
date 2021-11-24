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
		- Code postal
		- Ville
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
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	hour: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	firstname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	postalCode: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Report', reportSchema);
