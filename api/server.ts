import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import connectDB from './config/dbConnection.js';
import { errorHandler } from './middleware/errorHandler.js';
import rootRoutes from './routes/root.js';

const app = express();
const PORT = process.env.PORT ?? 8001;

void connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/', rootRoutes);

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

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${String(PORT)}`);
});
