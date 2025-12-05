import Joi from 'joi';

export const loginSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .trim()
      .lowercase()
      .messages({
        'any.required': 'Email is required',
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
      }),
    password: Joi.string().min(6).required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
    }),
  }),
};

export const signUpSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .trim()
      .lowercase()
      .messages({
        'any.required': 'Email is required',
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
      }),
    firstName: Joi.string().min(2).max(50).required().trim().messages({
      'any.required': 'First name is required',
      'string.empty': 'First name is required',
      'string.max': 'First name must not exceed 50 characters',
      'string.min': 'First name must be at least 2 characters long',
    }),
    lastName: Joi.string().min(2).max(50).required().trim().messages({
      'any.required': 'Last name is required',
      'string.empty': 'Last name is required',
      'string.max': 'Last name must not exceed 50 characters',
      'string.min': 'Last name must be at least 2 characters long',
    }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'any.required': 'Password is required',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      }),
  }),
};
