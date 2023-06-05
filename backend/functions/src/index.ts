import { https } from 'firebase-functions';
import ocrRouter from './routes/ocr';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use('/ocr', ocrRouter);

exports.api = https.onRequest(app);
