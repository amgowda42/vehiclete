import type { NextFunction, Request, Response } from 'express';

import { logAPI } from '../utils/logger.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    logAPI(req.method, req.originalUrl, res.statusCode, responseTime, { ip: req.ip });
  });

  next();
};
