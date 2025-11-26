import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'joi';

import { warn } from '../utils/logger.js';

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationSource {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

export const validate = (schema: ValidationSource) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationErrors: ValidationError[] = [];
    const validatedData: Record<string, unknown> = {};

    if (schema.body) {
      const result = schema.body.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (result.error) {
        result.error.details.forEach(detail => {
          validationErrors.push({
            field: detail.path.join('.'),
            message: detail.message,
          });
        });
      } else if (result.value) {
        Object.assign(validatedData, result.value as Record<string, unknown>);
      }
    }

    if (schema.params) {
      const result = schema.params.validate(req.params, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (result.error) {
        result.error.details.forEach(detail => {
          validationErrors.push({
            field: `params.${detail.path.join('.')}`,
            message: detail.message,
          });
        });
      } else if (result.value) {
        Object.assign(validatedData, result.value as Record<string, unknown>);
      }
    }

    if (schema.query) {
      const result = schema.query.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (result.error) {
        result.error.details.forEach(detail => {
          validationErrors.push({
            field: `query.${detail.path.join('.')}`,
            message: detail.message,
          });
        });
      } else if (result.value) {
        Object.assign(validatedData, result.value as Record<string, unknown>);
      }
    }

    if (validationErrors.length > 0) {
      warn('Validation failed', {
        errors: validationErrors,
        method: req.method,
        url: req.originalUrl,
      });

      res.status(400).json({
        errors: validationErrors,
        message: 'Validation failed',
        success: false,
      });
      return;
    }

    Object.assign(req.body, validatedData);
    Object.assign(req.params, validatedData);
    Object.assign(req.query, validatedData);

    next();
  };
};
