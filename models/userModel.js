import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

// pre hook
userSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	this.password = await bcrypt.hash(this.password, salt);
});

// Allow to compare password
userSchema.methods.matchPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

// Allow to export the model to use it in other files
export default mongoose.model('User', userSchema);
