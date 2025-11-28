import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import connectDB from './config/dbConnection.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import authRoutes from './routes/authRoutes.js';
import rootRoutes from './routes/root.js';
import { error } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT ?? '8001';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
      message: '404 Not Found',
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

//reference code.

// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import mongoose from 'mongoose';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import connectDB from './config/dbConnection.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import requestLogger from './middleware/logger.js';
// import rootRoutes from './routes/root.js';
// import { error as logError } from './utils/logger.js';
// import cors from 'cors';

// const app = express();
// const PORT = process.env.PORT ? Number(process.env.PORT) : 8001;

// // ========================
// // GLOBAL PROCESS HANDLERS
// // ========================
// process.on('unhandledRejection', (err: unknown) => {
//   if (err instanceof Error) {
//     logError('Unhandled Rejection', { error: err.message, stack: err.stack });
//   } else {
//     logError('Unhandled Rejection', { error: String(err) });
//   }
//   process.exit(1);
// });

// process.on('uncaughtException', (err: unknown) => {
//   if (err instanceof Error) {
//     logError('Uncaught Exception', { error: err.message, stack: err.stack });
//   } else {
//     logError('Uncaught Exception', { error: String(err) });
//   }
//   process.exit(1);
// });

// // ========================
// // MIDDLEWARE
// // ========================
// app.use(cors({ origin: process.env.CLIENT_URL ?? '*', credentials: true }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(requestLogger);

// // ========================
// // ROUTES
// // ========================
// app.use('/', rootRoutes);

// // 404 HANDLER
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.all('*', (req, res) => {
//   res.status(404);
//   if (req.accepts('html')) {
//     res.sendFile(path.join(__dirname, '..', 'public', '404.html'));
//   } else if (req.accepts('json')) {
//     res.json({
//       error: 'Not Found',
//       message: '404 Not Found',
//       path: req.originalUrl,
//     });
//   } else {
//     res.type('txt').send('404 Not Found');
//   }
// });

// app.use(errorHandler);

// // ========================
// // START SERVER
// // ========================
// void connectDB();

// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

// // Graceful shutdown
// process.on('SIGINT', () => {
//   console.log('Shutting down...');
//   mongoose.connection.close();
//   process.exit(0);
// });
