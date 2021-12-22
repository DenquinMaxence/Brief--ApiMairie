import mongoose from 'mongoose';

const roleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			uppercase: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Role', roleSchema);
