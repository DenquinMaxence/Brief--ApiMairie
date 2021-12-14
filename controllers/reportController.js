import reportModel from '../models/reportModel.js';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../utils/sendEmail.js';

export const createReport = async (req, res) => {
	const {
		typeReport,
		descReport,
		dateReport,
		addressReport,
		pictureReport,
		lastNameSender,
		firstNameSender,
		emailSender,
		addressSender,
		citySender,
		postalSender,
		phoneSender,
	} = req.body;

	let sendTo, mailResponse;
	try {
		switch (typeReport) {
			case 'highways':
				sendTo = 'voirie@simplonville.co';
				break;

			case 'parking':
				sendTo = 'stationnement@simplonville.co';
				break;

			case 'works':
				sendTo = 'travaux@simplonville.co';
				break;

			case 'animals':
				sendTo = 'animaux@simplonville.co';
				break;

			default:
				sendTo = 'autres@simplonville.co';
				break;
		}

		mailResponse = await sendEmail(
			sendTo,
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
					<p>Nom: ${lastNameSender}</p>
					<p>Prénom: ${firstNameSender}</p>
					<p>Email: ${emailSender}</p>
					<p>Adresse: ${addressSender}</p>
					<p>Ville: ${citySender}</p>
					<p>Code postal: ${postalSender}</p>
					<p>Numéro de téléphone: ${phoneSender}</p>
				</div>
			`
		);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorr: error.message });
	}

	try {
		const report = await reportModel.create({
			type: typeReport,
			description: descReport,
			date: dateReport,
			addressReport,
			picture: pictureReport,
			lastName: lastNameSender,
			firstName: firstNameSender,
			email: emailSender,
			address: addressSender,
			city: citySender,
			postalCode: postalSender,
			phone: phoneSender,
		});

		res.status(StatusCodes.CREATED).send({ report: report._id, mail: mailResponse.messageId });
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
