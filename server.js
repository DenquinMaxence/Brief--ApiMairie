import dotenv from 'dotenv';
dotenv.config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // ignore self signed certificate

import express from 'express';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import cors from 'cors';

const app = express();
const appPort = process.env.APP_PORT || 3500;

const start = async () => {
	try {
		await connectDB();
		app.listen(appPort, () => console.log(`Server is listening on port ${appPort}...`));
	} catch (error) {
		console.log(error);
	}
};

start();

// Middleware
app.use(cors());

// app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reports', reportRouter);
