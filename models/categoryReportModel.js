import mongoose from 'mongoose';

const categoryReportSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('CategoryReport', categoryReportSchema);
