import Joi from 'joi';

export const cycleIdSchema = {
  params: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'any.required': 'Cycle ID is required',
        'string.pattern.base': 'Invalid cycle ID format or id.',
      }),
  }),
};

export const cyclesQuerySchema = {
  query: Joi.object({
    brand: Joi.string().trim().optional(),
    category: Joi.string().trim().optional(),
  }).unknown(false),
};
