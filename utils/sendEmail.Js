import nodemailer from 'nodemailer';

export default (sendTo, subject, message) => {
	// transporter.sendMail does not return a promise, so we need to use async/await
	return new Promise((resolve, reject) => {
		// Send mail with outlook.com
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			secureConnection: false,
			port: process.env.EMAIL_PORT,
			tls: {
				ciphers: 'SSLv3',
			},
			auth: {
				user: process.env.EMAIL_HOST_USER,
				pass: process.env.EMAIL_HOST_PASSWORD,
			},
		});

		const mailOptions = {
			from: `"Mairie Simplonville" <${process.env.EMAIL_HOST_USER}>`,
			to: sendTo,
			subject: subject,
			html: message,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) reject(error);
			else resolve(info);
		});
	});
};
