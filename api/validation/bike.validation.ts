import Joi from 'joi';

export const bikeIdSchema = {
  params: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'any.required': 'Bike ID is required',
        'string.pattern.base': 'Invalid bike ID format or id.',
      }),
  }),
};

export const bikesQuerySchema = {
  query: Joi.object({
    brand: Joi.string().trim().optional(),
  }).unknown(false),
};
