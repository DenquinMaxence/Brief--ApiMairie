import nodemailer from 'nodemailer';

export default function sendEmail(sendTo, subject, message) {
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
		text: message,
		html: message,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return console.log(error);
		console.log('Message sent: %s', info.messageId);
	});
}
