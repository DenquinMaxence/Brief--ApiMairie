import reportModel from '../models/reportModel.js';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../utils/sendEmail.js';
import categoryReportModel from '../models/categoryReportModel.js';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const createReport = async (req, res) => {
	const {
		typeReport,
		descReport,
		dateReport,
		addressReport,
		pictureReport,
		lastName,
		firstName,
		email,
		address,
		city,
		postalCode,
		phone,
	} = req.body;

	let categoryExist;
	try {
		categoryExist = await categoryReportModel.findById(typeReport).select('-__v');
		if (!categoryExist)
			return res.status(StatusCodes.NOT_FOUND).send('Category of report not found');
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}

	let mailResponse;
	try {
		mailResponse = await sendEmail(
			`${categoryExist.name}@simplonville.co`,
			'Nouveau signalement',
			`
				<div>
					<h1>Informations sur le signalement</h1>
					<p>Description: ${descReport}</p>
					<p>Date et heure: ${dateReport}</p>
					<p>Adresse: ${addressReport}</p>
					<p>Photo:
						${
							pictureReport
								? `<a href="${pictureReport}">Cliquer ici pour voir l'image</a>`
								: 'Aucune photo fourni'
						}
					</p>
				</div>
				<div>
					<h1>Informations sur l'expéditeur du signalement</h1>
					<p>Nom: ${lastName}</p>
					<p>Prénom: ${firstName}</p>
					<p>Email: ${email}</p>
					<p>Adresse: ${address}</p>
					<p>Ville: ${city}</p>
					<p>Code postal: ${postalCode}</p>
					<p>Numéro de téléphone: ${phone}</p>
				</div>
			`
		);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}

	try {
		const report = await reportModel.create({
			type: typeReport,
			description: descReport,
			date: dateReport,
			addressReport,
			picture: pictureReport,
			lastName,
			firstName,
			email,
			address,
			city,
			postalCode,
			phone,
		});

		res.status(StatusCodes.CREATED).send({ report: report._id, mail: mailResponse.messageId });
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const deleteReport = async (req, res) => {
	const { id } = req.params;

	if (!ObjectId.isValid(id))
		return res.status(StatusCodes.BAD_REQUEST).send({ message: `Invalid parameter : ${id}` });

	let report;
	try {
		report = await reportModel.findByIdAndDelete(id);
		if (!report) return res.status(StatusCodes.NOT_FOUND).send('Report not found');
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}

	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	try {
		let publicId = report.picture.split('/').slice(-2);
		publicId = `${publicId[0]}/${publicId[1]}`;
		publicId = publicId.split('.').slice(0, -1).join('.');

		const result = await cloudinary.uploader.destroy(publicId, {
			resource_type: 'image',
		});
		if (!result) return res.status(StatusCodes.CONFLICT).send('Error while deleting picture');

		res.status(StatusCodes.OK).send({ report: report._id, image_deleted: result.result });
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
