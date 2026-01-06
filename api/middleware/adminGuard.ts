import type { NextFunction, Request, Response } from 'express';

import AppError from '../utils/AppError.js';

export const adminGuard = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    throw new AppError('Not authorized, user not authenticated', 401);
  }

  if (req.user.role !== 'admin') {
    throw new AppError('Access denied. Admin privileges required.', 403);
  }

  next();
};
