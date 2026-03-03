import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { corsOptions, corsOptionsDev } from './config/corsOptions.js';
import connectDB from './config/dbConnection.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import authRoutes from './routes/authRoutes.js';
import bikeRoutes from './routes/bikeRoutes.js';
import carRoutes from './routes/carRoutes.js';
import cycleRoutes from './routes/cycleRoutes.js';
import demoRoutes from './routes/demoRoutes.js';
import emiRoutes from './routes/emiRoutes.js';
import rootRoutes from './routes/root.js';
import usersRoutes from './routes/userRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import vehiclesStatsRoutes from './routes/vehiclesStatsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? '8001';

app.use(cors(process.env.NODE_ENV === 'development' ? corsOptionsDev : corsOptions));
app.options('/*splat', cors(process.env.NODE_ENV === 'development' ? corsOptionsDev : corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const start = async () => {
  await connectDB();

  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

void start();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(requestLogger);

app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/bikes', bikeRoutes);
app.use('/cars', carRoutes);
app.use('/cycles', cycleRoutes);
app.use('/vehiclesStats', vehiclesStatsRoutes);
app.use('/users', usersRoutes);
app.use('/emi', emiRoutes);
app.use('/demo', demoRoutes);
app.use('/vehicle', vehicleRoutes);
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

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
