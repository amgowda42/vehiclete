/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { NextFunction, Request, Response } from 'express';

import { logError } from '../utils/logger.js';

interface ErrorWithStatus extends Error {
  code?: number;
  errors?: Record<string, { message: string; path: string }>;
  keyValue?: Record<string, unknown>;
  status?: string;
  statusCode?: number;
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode ?? 500;

  // Log error
  logError(err, req);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error.message = `Resource not found`;
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0];
    error.message = `${field} already exists`;
    error.statusCode = 409;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors ?? {}).map(e => ({
      field: e.path,
      message: e.message,
    }));
    return void res.status(400).json({
      errors,
      message: 'Validation failed',
      success: false,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = 401;
  }

  // Sending error response
  res.status(error.statusCode).json({
    message: error.message,
    success: false,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  });
};
