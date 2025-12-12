import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8000',
  process.env.FRONTEND_URL,
].filter(Boolean);

export const corsOptions: cors.CorsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
};

// for development only
export const corsOptionsDev: cors.CorsOptions = {
  credentials: true,
  origin: true,
};
