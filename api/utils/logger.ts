import { type Request } from 'express';

import { logger } from '../config/logger.js';

interface ErrorWithStatus extends Error {
  statusCode?: number;
}

type LogMeta = Record<string, unknown>;

export const info = (message: string, meta: LogMeta = {}): void => {
  logger.info(message, meta);
};

export const error = (message: string, meta: LogMeta = {}): void => {
  logger.error(message, meta);
};

export const warn = (message: string, meta: LogMeta = {}): void => {
  logger.warn(message, meta);
};

export const debug = (message: string, meta: LogMeta = {}): void => {
  logger.debug(message, meta);
};

export const logAPI = (
  method: string,
  url: string,
  statusCode: number,
  responseTime: number,
  meta: LogMeta = {}
): void => {
  logger.info('API Request', {
    method,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    responseTime: `${responseTime}ms`,
    statusCode,
    url,
    ...meta,
  });
};

export const logAuth = (event: string, userId: string, meta: LogMeta = {}): void => {
  logger.info(`Auth: ${event}`, { userId, ...meta });
};

export const logDB = (operation: string, collection: string, meta: LogMeta = {}): void => {
  logger.debug(`DB ${operation}`, { collection, ...meta });
};

export const logError = (error: ErrorWithStatus, req: null | Request = null): void => {
  const errorLog: LogMeta = {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode ?? 500,
  };

  if (req) {
    errorLog.method = req.method;
    errorLog.url = req.originalUrl;
    errorLog.ip = req.ip;
    errorLog.body = req.body;
  }

  logger.error('Application Error', errorLog);
};
