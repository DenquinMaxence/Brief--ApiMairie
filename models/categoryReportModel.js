import mongoose from 'mongoose';

const categoryReportSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('CategoryReport', categoryReportSchema);
