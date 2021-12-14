import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Merci de fournir un nom d'utilisateur"],
			minlength: 3,
			maxlength: 50,
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Merci d'insérer une adresse email"],
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Merci de fournir une adresse email valide',
			],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Merci de fournir un mot de passe'],
			minlength: 3,
			maxlength: 1024,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', userSchema);
