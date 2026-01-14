import Joi from 'joi';

export const carIdSchema = {
  params: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'any.required': 'Car ID is required',
        'string.pattern.base': 'Invalid car ID format or id.',
      }),
  }),
};

export const carsQuerySchema = {
  query: Joi.object({
    brand: Joi.string().trim().optional(),
  }).unknown(false),
};
