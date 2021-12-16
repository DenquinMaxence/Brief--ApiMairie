import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
	{
		lastName: {
			type: String,
			required: [true, 'Merci de fournir votre nom de famille'],
			minlength: 3,
			maxlength: 50,
		},
		firstName: {
			type: String,
			required: [true, 'Merci de fournir votre prénom'],
			minlength: 3,
			maxlength: 50,
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

userSchema.index({ lastName: 1, firstName: 1 }, { unique: true });

//pre hook
userSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	this.password = await bcrypt.hash(this.password, salt);
});

// Create JWT token
userSchema.methods.generateJWT = function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

// Allow to compare password
userSchema.methods.matchPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

// Allow to export the model to use it in other files
export default mongoose.model('User', userSchema);
