import Joi from 'joi';

export const createBikeSchema = {
  body: Joi.object({
    abs: Joi.boolean().required().messages({
      'any.required': 'ABS status is required',
      'boolean.base': 'ABS must be true or false',
    }),

    acceleration: Joi.string().required().trim().messages({
      'any.required': 'Acceleration is required',
      'string.empty': 'Acceleration is required',
    }),

    brakingSystem: Joi.string().required().trim().messages({
      'any.required': 'Braking system is required',
      'string.empty': 'Braking system is required',
    }),

    brand: Joi.string().min(2).max(50).required().trim().messages({
      'any.required': 'Brand is required',
      'string.empty': 'Brand is required',
      'string.max': 'Brand must not exceed 50 characters',
      'string.min': 'Brand must be at least 2 characters long',
    }),

    caliperType: Joi.string().required().trim().messages({
      'any.required': 'Caliper type is required',
      'string.empty': 'Caliper type is required',
    }),

    color: Joi.string().min(2).max(50).required().trim().messages({
      'any.required': 'Color is required',
      'string.empty': 'Color is required',
      'string.max': 'Color must not exceed 50 characters',
      'string.min': 'Color must be at least 2 characters long',
    }),

    coolingSystem: Joi.string().required().trim().messages({
      'any.required': 'Cooling system is required',
      'string.empty': 'Cooling system is required',
    }),

    displacement: Joi.string().required().trim().messages({
      'any.required': 'Displacement is required',
      'string.empty': 'Displacement is required',
    }),

    engineCapacity: Joi.number().positive().required().messages({
      'any.required': 'Engine capacity is required',
      'number.base': 'Engine capacity must be a number',
      'number.positive': 'Engine capacity must be a positive number',
    }),

    frontBrakeType: Joi.string().required().trim().messages({
      'any.required': 'Front brake type is required',
      'string.empty': 'Front brake type is required',
    }),

    frontSuspension: Joi.string().required().trim().messages({
      'any.required': 'Front suspension is required',
      'string.empty': 'Front suspension is required',
    }),

    fuelTankCapacity: Joi.number().positive().required().messages({
      'any.required': 'Fuel tank capacity is required',
      'number.base': 'Fuel tank capacity must be a number',
      'number.positive': 'Fuel tank capacity must be a positive number',
    }),

    groundClearance: Joi.number().positive().optional().messages({
      'number.base': 'Ground clearance must be a number',
      'number.positive': 'Ground clearance must be a positive number',
    }),

    isAvailable: Joi.boolean().default(true).messages({
      'boolean.base': 'Availability must be true or false',
    }),

    kerbWeight: Joi.number().positive().required().messages({
      'any.required': 'Kerb weight is required',
      'number.base': 'Kerb weight must be a number',
      'number.positive': 'Kerb weight must be a positive number',
    }),

    maxPower: Joi.string().required().trim().messages({
      'any.required': 'Max power is required',
      'string.empty': 'Max power is required',
    }),

    maxTorque: Joi.string().required().trim().messages({
      'any.required': 'Max torque is required',
      'string.empty': 'Max torque is required',
    }),

    mileage: Joi.number().positive().required().messages({
      'any.required': 'Mileage is required',
      'number.base': 'Mileage must be a number',
      'number.positive': 'Mileage must be a positive number',
    }),

    model: Joi.string().min(2).max(100).required().trim().messages({
      'any.required': 'Model is required',
      'string.empty': 'Model is required',
      'string.max': 'Model must not exceed 100 characters',
      'string.min': 'Model must be at least 2 characters long',
    }),

    price: Joi.number().positive().required().messages({
      'any.required': 'Price is required',
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
    }),

    quickShifter: Joi.boolean().required().messages({
      'any.required': 'Quick shifter status is required',
      'boolean.base': 'Quick shifter must be true or false',
    }),

    rearBrakeType: Joi.string().required().trim().messages({
      'any.required': 'Rear brake type is required',
      'string.empty': 'Rear brake type is required',
    }),

    rearSuspension: Joi.string().required().trim().messages({
      'any.required': 'Rear suspension is required',
      'string.empty': 'Rear suspension is required',
    }),

    seatHeight: Joi.number().positive().required().messages({
      'any.required': 'Seat height is required',
      'number.base': 'Seat height must be a number',
      'number.positive': 'Seat height must be a positive number',
    }),

    seatLength: Joi.number().positive().required().messages({
      'any.required': 'Seat length is required',
      'number.base': 'Seat length must be a number',
      'number.positive': 'Seat length must be a positive number',
    }),

    topSpeed: Joi.string().required().trim().messages({
      'any.required': 'Top speed is required',
      'string.empty': 'Top speed is required',
    }),

    transmission: Joi.string().required().trim().messages({
      'any.required': 'Transmission is required',
      'string.empty': 'Transmission is required',
    }),

    varient: Joi.string().min(2).max(50).required().trim().messages({
      'any.required': 'Variant is required',
      'string.empty': 'Variant is required',
      'string.max': 'Variant must not exceed 50 characters',
      'string.min': 'Variant must be at least 2 characters long',
    }),

    year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear() + 1)
      .required()
      .messages({
        'any.required': 'Year is required',
        'number.base': 'Year must be a number',
        'number.integer': 'Year must be an integer',
        'number.max': `Year cannot be beyond ${(new Date().getFullYear() + 1).toString()}`,
        'number.min': 'Year must be 1900 or later',
      }),
  }),
};

export const updateBikeSchema = {
  body: Joi.object({
    abs: Joi.boolean().messages({
      'boolean.base': 'ABS must be true or false',
    }),
    acceleration: Joi.string().trim(),
    brakingSystem: Joi.string().trim(),
    brand: Joi.string().min(2).max(50).trim().messages({
      'string.max': 'Brand must not exceed 50 characters',
      'string.min': 'Brand must be at least 2 characters long',
    }),

    caliperType: Joi.string().trim(),

    color: Joi.string().min(2).max(50).trim().messages({
      'string.max': 'Color must not exceed 50 characters',
      'string.min': 'Color must be at least 2 characters long',
    }),
    coolingSystem: Joi.string().trim(),

    displacement: Joi.string().trim(),

    engineCapacity: Joi.number().positive().messages({
      'number.base': 'Engine capacity must be a number',
      'number.positive': 'Engine capacity must be a positive number',
    }),

    frontBrakeType: Joi.string().trim(),
    frontSuspension: Joi.string().trim(),

    fuelTankCapacity: Joi.number().positive().messages({
      'number.base': 'Fuel tank capacity must be a number',
      'number.positive': 'Fuel tank capacity must be a positive number',
    }),

    groundClearance: Joi.number().positive().messages({
      'number.base': 'Ground clearance must be a number',
      'number.positive': 'Ground clearance must be a positive number',
    }),

    isAvailable: Joi.boolean().messages({
      'boolean.base': 'Availability must be true or false',
    }),

    kerbWeight: Joi.number().positive().messages({
      'number.base': 'Kerb weight must be a number',
      'number.positive': 'Kerb weight must be a positive number',
    }),

    maxPower: Joi.string().trim(),

    maxTorque: Joi.string().trim(),

    mileage: Joi.number().positive().messages({
      'number.base': 'Mileage must be a number',
      'number.positive': 'Mileage must be a positive number',
    }),

    model: Joi.string().min(2).max(100).trim().messages({
      'string.max': 'Model must not exceed 100 characters',
      'string.min': 'Model must be at least 2 characters long',
    }),

    price: Joi.number().positive().messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
    }),

    quickShifter: Joi.boolean().messages({
      'boolean.base': 'Quick shifter must be true or false',
    }),

    rearBrakeType: Joi.string().trim(),
    rearSuspension: Joi.string().trim(),

    seatHeight: Joi.number().positive().messages({
      'number.base': 'Seat height must be a number',
      'number.positive': 'Seat height must be a positive number',
    }),

    seatLength: Joi.number().positive().messages({
      'number.base': 'Seat length must be a number',
      'number.positive': 'Seat length must be a positive number',
    }),

    topSpeed: Joi.string().trim(),
    transmission: Joi.string().trim(),

    varient: Joi.string().min(2).max(50).trim().messages({
      'string.max': 'Variant must not exceed 50 characters',
      'string.min': 'Variant must be at least 2 characters long',
    }),

    year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear() + 1)
      .messages({
        'number.base': 'Year must be a number',
        'number.integer': 'Year must be an integer',
        'number.max': `Year cannot be beyond ${(new Date().getFullYear() + 1).toString()}`,
        'number.min': 'Year must be 1900 or later',
      }),
  }).min(1),
};

export const bikeIdSchema = {
  params: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'any.required': 'Bike ID is required',
        'string.pattern.base': 'Invalid bike ID format',
      }),
  }),
};
