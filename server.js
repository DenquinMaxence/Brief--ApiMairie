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

// Middlware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/reports', reportRouter);
