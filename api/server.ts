import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import { corsOptions, corsOptionsDev } from './config/corsOptions.js';
import connectDB from './config/dbConnection.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import authRoutes from './routes/authRoutes.js';
import rootRoutes from './routes/root.js';
import { error } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT ?? '8001';

app.use(cors(process.env.NODE_ENV === 'development' ? corsOptionsDev : corsOptions));
app.options('/*splat', cors(process.env.NODE_ENV === 'development' ? corsOptionsDev : corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

void connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(requestLogger);

app.use('/', rootRoutes);
app.use('/auth', authRoutes);

app.all('/*splat', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '..', 'public', '404.html'));
  } else if (req.accepts('json')) {
    res.json({
      error: 'Not Found',
      message: '404 Not Found (this url not found)',
      path: req.originalUrl,
    });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

process.on('unhandledRejection', (err: unknown) => {
  if (err instanceof Error) {
    error('Unhandled Rejection', { error: err.message, stack: err.stack });
  } else {
    error('Unhandled Rejection', { error: String(err) });
  }
  process.exit(1);
});

process.on('uncaughtException', (err: unknown) => {
  if (err instanceof Error) {
    error('Uncaught Exception', { error: err.message, stack: err.stack });
  } else {
    error('Uncaught Exception', { error: String(err) });
  }
  process.exit(1);
});
