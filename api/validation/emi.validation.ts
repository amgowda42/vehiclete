import Joi from 'joi';

export const upsertEmiSchema = {
  body: Joi.object({
    downPayment: Joi.number().min(0).max(Joi.ref('price')).default(0).messages({
      'number.max': 'Down payment cannot be greater than price',
      'number.min': 'Down payment cannot be negative',
    }),

    interestRate: Joi.number().greater(0).required().messages({
      'any.required': 'Interest rate is required',
      'number.greater': 'Interest rate must be greater than 0',
    }),

    price: Joi.number().positive().required().messages({
      'any.required': 'Price is required',
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be greater than 0',
    }),

    tenureMonths: Joi.number().integer().min(1).required().messages({
      'any.required': 'Tenure is required',
      'number.integer': 'Tenure must be an integer',
      'number.min': 'Tenure must be at least 1 month',
    }),
    vehicleId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'any.required': 'Vehicle ID is required',
        'string.pattern.base': 'Invalid vehicle ID format',
      }),
  }).unknown(false),
};
