import type { NextFunction, Request, Response } from 'express';

import AppError from '../utils/AppError.js';

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message);
  console.error(err.stack);

  const status = err instanceof AppError ? err.status : 500;

  res.status(status).json({
    message: err.message || 'Internal Server Error',
    status: 'error',
  });
};
