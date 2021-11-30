import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
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
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// Routes
app.use('/api/v1/reports', reportRouter);
