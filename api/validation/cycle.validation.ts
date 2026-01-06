import Joi from 'joi';

// Cycle category enum
const cycleCategories = [
  'Mountain',
  'Road',
  'Hybrid',
  'Electric',
  'Kids',
  'BMX',
  'Folding',
  'Cruiser',
];

// Create Cycle Validation Schema
export const createCycleSchema = Joi.object({
  // Basic Information
  brand: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Brand is required',
    'string.min': 'Brand must be at least 2 characters long',
    'string.max': 'Brand must not exceed 50 characters',
    'any.required': 'Brand is required',
  }),

  model: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Model is required',
    'string.min': 'Model must be at least 2 characters long',
    'string.max': 'Model must not exceed 100 characters',
    'any.required': 'Model is required',
  }),

  year: Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear() + 1)
    .required()
    .messages({
      'number.base': 'Year must be a number',
      'number.min': 'Year must be 2000 or later',
      'number.max': `Year must not exceed ${new Date().getFullYear() + 1}`,
      'any.required': 'Year is required',
    }),

  category: Joi.string()
    .valid(...cycleCategories)
    .required()
    .messages({
      'any.only': `Category must be one of: ${cycleCategories.join(', ')}`,
      'any.required': 'Category is required',
    }),

  color: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Color is required',
    'string.min': 'Color must be at least 2 characters long',
    'string.max': 'Color must not exceed 50 characters',
    'any.required': 'Color is required',
  }),

  imageUrl: Joi.string().uri().required().messages({
    'string.uri': 'Image URL must be a valid URL',
    'any.required': 'Image URL is required',
  }),

  isAvailable: Joi.boolean().default(true).messages({
    'boolean.base': 'isAvailable must be a boolean',
  }),

  price: Joi.number().positive().required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required',
  }),

  // Frame & Specifications
  frameMaterial: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Frame material is required',
    'any.required': 'Frame material is required',
  }),

  frameSize: Joi.string().trim().min(1).max(20).required().messages({
    'string.empty': 'Frame size is required',
    'any.required': 'Frame size is required',
  }),

  weight: Joi.number().positive().max(50).required().messages({
    'number.base': 'Weight must be a number',
    'number.positive': 'Weight must be a positive number',
    'number.max': 'Weight must not exceed 50 kg',
    'any.required': 'Weight is required',
  }),

  // Wheels & Gears
  wheelSize: Joi.string().trim().required().messages({
    'string.empty': 'Wheel size is required',
    'any.required': 'Wheel size is required',
  }),

  gears: Joi.number().integer().min(1).max(30).required().messages({
    'number.base': 'Gears must be a number',
    'number.integer': 'Gears must be an integer',
    'number.min': 'Gears must be at least 1',
    'number.max': 'Gears must not exceed 30',
    'any.required': 'Number of gears is required',
  }),

  gearType: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Gear type is required',
    'any.required': 'Gear type is required',
  }),

  // Brakes & Suspension
  brakeType: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Brake type is required',
    'any.required': 'Brake type is required',
  }),

  suspension: Joi.string().trim().valid('Front', 'Full', 'Rigid').required().messages({
    'any.only': 'Suspension must be one of: Front, Full, Rigid',
    'any.required': 'Suspension type is required',
  }),

  // Features
  features: Joi.array().items(Joi.string().trim()).default([]).messages({
    'array.base': 'Features must be an array',
  }),

  // Electric Cycle Specific
  isElectric: Joi.boolean().required().messages({
    'boolean.base': 'isElectric must be a boolean',
    'any.required': 'isElectric is required',
  }),

  motorPower: Joi.when('isElectric', {
    is: true,
    then: Joi.number().positive().max(5000).messages({
      'number.base': 'Motor power must be a number',
      'number.positive': 'Motor power must be a positive number',
      'number.max': 'Motor power must not exceed 5000 Watts',
    }),
    otherwise: Joi.forbidden(),
  }),

  batteryCapacity: Joi.when('isElectric', {
    is: true,
    then: Joi.number().positive().max(100).messages({
      'number.base': 'Battery capacity must be a number',
      'number.positive': 'Battery capacity must be a positive number',
      'number.max': 'Battery capacity must not exceed 100 Ah',
    }),
    otherwise: Joi.forbidden(),
  }),

  range: Joi.when('isElectric', {
    is: true,
    then: Joi.number().positive().max(500).messages({
      'number.base': 'Range must be a number',
      'number.positive': 'Range must be a positive number',
      'number.max': 'Range must not exceed 500 km',
    }),
    otherwise: Joi.forbidden(),
  }),

  // Usage & Dimensions
  recommendedHeight: Joi.string().trim().required().messages({
    'string.empty': 'Recommended height is required',
    'any.required': 'Recommended height is required',
  }),

  maxLoad: Joi.number().positive().max(200).required().messages({
    'number.base': 'Max load must be a number',
    'number.positive': 'Max load must be a positive number',
    'number.max': 'Max load must not exceed 200 kg',
    'any.required': 'Max load is required',
  }),

  terrain: Joi.array().items(Joi.string().trim()).default([]).messages({
    'array.base': 'Terrain must be an array',
  }),

  // Warranty
  warrantyYears: Joi.number().integer().min(0).max(10).required().messages({
    'number.base': 'Warranty years must be a number',
    'number.integer': 'Warranty years must be an integer',
    'number.min': 'Warranty years must be at least 0',
    'number.max': 'Warranty years must not exceed 10',
    'any.required': 'Warranty years is required',
  }),
});

// Update Cycle Validation Schema (all fields optional)
export const updateCycleSchema = Joi.object({
  brand: Joi.string().trim().min(2).max(50),
  model: Joi.string().trim().min(2).max(100),
  year: Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  category: Joi.string().valid(...cycleCategories),
  color: Joi.string().trim().min(2).max(50),
  imageUrl: Joi.string().uri(),
  isAvailable: Joi.boolean(),
  price: Joi.number().positive(),
  frameMaterial: Joi.string().trim().min(2).max(50),
  frameSize: Joi.string().trim().min(1).max(20),
  weight: Joi.number().positive().max(50),
  wheelSize: Joi.string().trim(),
  gears: Joi.number().integer().min(1).max(30),
  gearType: Joi.string().trim().min(2).max(50),
  brakeType: Joi.string().trim().min(2).max(50),
  suspension: Joi.string().trim().valid('Front', 'Full', 'Rigid'),
  features: Joi.array().items(Joi.string().trim()),
  isElectric: Joi.boolean(),
  motorPower: Joi.when('isElectric', {
    is: true,
    then: Joi.number().positive().max(5000),
    otherwise: Joi.forbidden(),
  }),
  batteryCapacity: Joi.when('isElectric', {
    is: true,
    then: Joi.number().positive().max(100),
    otherwise: Joi.forbidden(),
  }),
  range: Joi.when('isElectric', {
    is: true,
    then: Joi.number().positive().max(500),
    otherwise: Joi.forbidden(),
  }),
  recommendedHeight: Joi.string().trim(),
  maxLoad: Joi.number().positive().max(200),
  terrain: Joi.array().items(Joi.string().trim()),
  warrantyYears: Joi.number().integer().min(0).max(10),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

// ID Parameter Validation
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

// Query Parameters Validation
export const cycleQuerySchema = Joi.object({
  brand: Joi.string().trim(),
  category: Joi.string().valid(...cycleCategories),
  isElectric: Joi.boolean(),
  minPrice: Joi.number().positive(),
  maxPrice: Joi.number().positive(),
  year: Joi.number().integer().min(2000),
  isAvailable: Joi.boolean(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid('price', 'year', 'brand', 'createdAt').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});

// Export all schemas
export default {
  createCycleSchema,
  updateCycleSchema,
  cycleIdSchema,
  cycleQuerySchema,
};
