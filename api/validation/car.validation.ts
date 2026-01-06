import Joi from 'joi';

export const createCarSchema = {
  body: Joi.object({
    // Basic Information
    brand: Joi.string().min(2).max(50).required().trim().messages({
      'any.required': 'Brand is required',
      'string.empty': 'Brand is required',
      'string.max': 'Brand must not exceed 50 characters',
      'string.min': 'Brand must be at least 2 characters long',
    }),

    model: Joi.string().min(2).max(100).required().trim().messages({
      'any.required': 'Model is required',
      'string.empty': 'Model is required',
      'string.max': 'Model must not exceed 100 characters',
      'string.min': 'Model must be at least 2 characters long',
    }),

    variant: Joi.string().min(2).max(100).required().trim().messages({
      'any.required': 'Variant is required',
      'string.empty': 'Variant is required',
      'string.max': 'Variant must not exceed 100 characters',
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

    bodyType: Joi.string()
      .valid('Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'MPV')
      .required()
      .messages({
        'any.required': 'Body type is required',
        'any.only':
          'Body type must be one of: Sedan, SUV, Hatchback, Coupe, Convertible, Wagon, MPV',
      }),

    color: Joi.string().min(2).max(50).required().trim().messages({
      'any.required': 'Color is required',
      'string.empty': 'Color is required',
      'string.max': 'Color must not exceed 50 characters',
      'string.min': 'Color must be at least 2 characters long',
    }),

    imageUrl: Joi.string().uri().required().messages({
      'any.required': 'Image URL is required',
      'string.empty': 'Image URL is required',
      'string.uri': 'Image URL must be a valid URL',
    }),

    isAvailable: Joi.boolean().default(true).messages({
      'boolean.base': 'Availability must be true or false',
    }),

    price: Joi.number().positive().required().messages({
      'any.required': 'Price is required',
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
    }),

    // Engine & Performance
    engineType: Joi.string().required().trim().messages({
      'any.required': 'Engine type is required',
      'string.empty': 'Engine type is required',
    }),

    engineCapacity: Joi.number().min(0).required().messages({
      'any.required': 'Engine capacity is required',
      'number.base': 'Engine capacity must be a number',
      'number.min': 'Engine capacity cannot be negative',
    }),

    displacement: Joi.string().required().trim().messages({
      'any.required': 'Displacement is required',
      'string.empty': 'Displacement is required',
    }),

    fuelType: Joi.string().required().trim().messages({
      'any.required': 'Fuel type is required',
      'string.empty': 'Fuel type is required',
    }),

    maxPower: Joi.string().required().trim().messages({
      'any.required': 'Max power is required',
      'string.empty': 'Max power is required',
    }),

    maxTorque: Joi.string().required().trim().messages({
      'any.required': 'Max torque is required',
      'string.empty': 'Max torque is required',
    }),

    acceleration: Joi.string().required().trim().messages({
      'any.required': 'Acceleration is required',
      'string.empty': 'Acceleration is required',
    }),

    topSpeed: Joi.string().required().trim().messages({
      'any.required': 'Top speed is required',
      'string.empty': 'Top speed is required',
    }),

    driveType: Joi.string().required().trim().messages({
      'any.required': 'Drive type is required',
      'string.empty': 'Drive type is required',
    }),

    transmission: Joi.string().required().trim().messages({
      'any.required': 'Transmission is required',
      'string.empty': 'Transmission is required',
    }),

    gearbox: Joi.string().required().trim().messages({
      'any.required': 'Gearbox is required',
      'string.empty': 'Gearbox is required',
    }),

    // Fuel & Efficiency
    fuelTankCapacity: Joi.number().positive().required().messages({
      'any.required': 'Fuel tank capacity is required',
      'number.base': 'Fuel tank capacity must be a number',
      'number.positive': 'Fuel tank capacity must be a positive number',
    }),

    mileageCity: Joi.number().min(0).required().messages({
      'any.required': 'City mileage is required',
      'number.base': 'City mileage must be a number',
      'number.min': 'City mileage cannot be negative',
    }),

    mileageHighway: Joi.number().min(0).required().messages({
      'any.required': 'Highway mileage is required',
      'number.base': 'Highway mileage must be a number',
      'number.min': 'Highway mileage cannot be negative',
    }),

    emissionStandard: Joi.string().required().trim().messages({
      'any.required': 'Emission standard is required',
      'string.empty': 'Emission standard is required',
    }),

    range: Joi.number().positive().optional().messages({
      'number.base': 'Range must be a number',
      'number.positive': 'Range must be a positive number',
    }),

    batteryCapacity: Joi.number().positive().optional().messages({
      'number.base': 'Battery capacity must be a number',
      'number.positive': 'Battery capacity must be a positive number',
    }),

    chargingTime: Joi.string().trim().optional(),

    // Dimensions & Capacity
    length: Joi.number().positive().required().messages({
      'any.required': 'Length is required',
      'number.base': 'Length must be a number',
      'number.positive': 'Length must be a positive number',
    }),

    width: Joi.number().positive().required().messages({
      'any.required': 'Width is required',
      'number.base': 'Width must be a number',
      'number.positive': 'Width must be a positive number',
    }),

    height: Joi.number().positive().required().messages({
      'any.required': 'Height is required',
      'number.base': 'Height must be a number',
      'number.positive': 'Height must be a positive number',
    }),

    wheelbase: Joi.number().positive().required().messages({
      'any.required': 'Wheelbase is required',
      'number.base': 'Wheelbase must be a number',
      'number.positive': 'Wheelbase must be a positive number',
    }),

    groundClearance: Joi.number().positive().required().messages({
      'any.required': 'Ground clearance is required',
      'number.base': 'Ground clearance must be a number',
      'number.positive': 'Ground clearance must be a positive number',
    }),

    kerbWeight: Joi.number().positive().required().messages({
      'any.required': 'Kerb weight is required',
      'number.base': 'Kerb weight must be a number',
      'number.positive': 'Kerb weight must be a positive number',
    }),

    grossWeight: Joi.number().positive().required().messages({
      'any.required': 'Gross weight is required',
      'number.base': 'Gross weight must be a number',
      'number.positive': 'Gross weight must be a positive number',
    }),

    bootSpace: Joi.number().min(0).required().messages({
      'any.required': 'Boot space is required',
      'number.base': 'Boot space must be a number',
      'number.min': 'Boot space cannot be negative',
    }),

    seatingCapacity: Joi.number().integer().min(1).max(15).required().messages({
      'any.required': 'Seating capacity is required',
      'number.base': 'Seating capacity must be a number',
      'number.integer': 'Seating capacity must be an integer',
      'number.min': 'Seating capacity must be at least 1',
      'number.max': 'Seating capacity cannot exceed 15',
    }),

    doors: Joi.number().integer().min(2).max(6).required().messages({
      'any.required': 'Number of doors is required',
      'number.base': 'Number of doors must be a number',
      'number.integer': 'Number of doors must be an integer',
      'number.min': 'Number of doors must be at least 2',
      'number.max': 'Number of doors cannot exceed 6',
    }),

    // Suspension & Brakes
    frontSuspension: Joi.string().required().trim().messages({
      'any.required': 'Front suspension is required',
      'string.empty': 'Front suspension is required',
    }),

    rearSuspension: Joi.string().required().trim().messages({
      'any.required': 'Rear suspension is required',
      'string.empty': 'Rear suspension is required',
    }),

    frontBrakeType: Joi.string().required().trim().messages({
      'any.required': 'Front brake type is required',
      'string.empty': 'Front brake type is required',
    }),

    rearBrakeType: Joi.string().required().trim().messages({
      'any.required': 'Rear brake type is required',
      'string.empty': 'Rear brake type is required',
    }),

    brakingSystem: Joi.string().required().trim().messages({
      'any.required': 'Braking system is required',
      'string.empty': 'Braking system is required',
    }),

    // Wheels & Tires
    wheelSize: Joi.string().required().trim().messages({
      'any.required': 'Wheel size is required',
      'string.empty': 'Wheel size is required',
    }),

    tireSize: Joi.string().required().trim().messages({
      'any.required': 'Tire size is required',
      'string.empty': 'Tire size is required',
    }),

    spareTire: Joi.string().required().trim().messages({
      'any.required': 'Spare tire type is required',
      'string.empty': 'Spare tire type is required',
    }),

    // Safety Features
    airbags: Joi.number().integer().min(0).max(12).required().messages({
      'any.required': 'Number of airbags is required',
      'number.base': 'Number of airbags must be a number',
      'number.integer': 'Number of airbags must be an integer',
      'number.min': 'Number of airbags cannot be negative',
      'number.max': 'Number of airbags cannot exceed 12',
    }),

    abs: Joi.boolean().required().messages({
      'any.required': 'ABS status is required',
      'boolean.base': 'ABS must be true or false',
    }),

    ebd: Joi.boolean().required().messages({
      'any.required': 'EBD status is required',
      'boolean.base': 'EBD must be true or false',
    }),

    esc: Joi.boolean().required().messages({
      'any.required': 'ESC status is required',
      'boolean.base': 'ESC must be true or false',
    }),

    tractionControl: Joi.boolean().required().messages({
      'any.required': 'Traction control status is required',
      'boolean.base': 'Traction control must be true or false',
    }),

    hillAssist: Joi.boolean().required().messages({
      'any.required': 'Hill assist status is required',
      'boolean.base': 'Hill assist must be true or false',
    }),

    isofix: Joi.boolean().required().messages({
      'any.required': 'ISOFIX status is required',
      'boolean.base': 'ISOFIX must be true or false',
    }),

    parkingSensors: Joi.string().required().trim().messages({
      'any.required': 'Parking sensors info is required',
      'string.empty': 'Parking sensors info is required',
    }),

    reverseCamera: Joi.boolean().required().messages({
      'any.required': 'Reverse camera status is required',
      'boolean.base': 'Reverse camera must be true or false',
    }),

    ncapRating: Joi.number().min(0).max(5).optional().messages({
      'number.base': 'NCAP rating must be a number',
      'number.min': 'NCAP rating cannot be less than 0',
      'number.max': 'NCAP rating cannot exceed 5',
    }),

    // Comfort & Convenience
    ac: Joi.string().required().trim().messages({
      'any.required': 'AC type is required',
      'string.empty': 'AC type is required',
    }),

    powerSteering: Joi.boolean().required().messages({
      'any.required': 'Power steering status is required',
      'boolean.base': 'Power steering must be true or false',
    }),

    powerWindows: Joi.string().required().trim().messages({
      'any.required': 'Power windows info is required',
      'string.empty': 'Power windows info is required',
    }),

    adjustableSeats: Joi.string().required().trim().messages({
      'any.required': 'Adjustable seats info is required',
      'string.empty': 'Adjustable seats info is required',
    }),

    cruiseControl: Joi.boolean().required().messages({
      'any.required': 'Cruise control status is required',
      'boolean.base': 'Cruise control must be true or false',
    }),

    keylessEntry: Joi.boolean().required().messages({
      'any.required': 'Keyless entry status is required',
      'boolean.base': 'Keyless entry must be true or false',
    }),

    pushButtonStart: Joi.boolean().required().messages({
      'any.required': 'Push button start status is required',
      'boolean.base': 'Push button start must be true or false',
    }),

    sunroof: Joi.boolean().required().messages({
      'any.required': 'Sunroof status is required',
      'boolean.base': 'Sunroof must be true or false',
    }),

    panoramicSunroof: Joi.boolean().required().messages({
      'any.required': 'Panoramic sunroof status is required',
      'boolean.base': 'Panoramic sunroof must be true or false',
    }),

    ventilatedSeats: Joi.boolean().required().messages({
      'any.required': 'Ventilated seats status is required',
      'boolean.base': 'Ventilated seats must be true or false',
    }),

    heatedSeats: Joi.boolean().required().messages({
      'any.required': 'Heated seats status is required',
      'boolean.base': 'Heated seats must be true or false',
    }),

    // Infotainment & Technology
    infotainmentScreen: Joi.string().required().trim().messages({
      'any.required': 'Infotainment screen size is required',
      'string.empty': 'Infotainment screen size is required',
    }),

    touchscreen: Joi.boolean().required().messages({
      'any.required': 'Touchscreen status is required',
      'boolean.base': 'Touchscreen must be true or false',
    }),

    androidAuto: Joi.boolean().required().messages({
      'any.required': 'Android Auto status is required',
      'boolean.base': 'Android Auto must be true or false',
    }),

    appleCarPlay: Joi.boolean().required().messages({
      'any.required': 'Apple CarPlay status is required',
      'boolean.base': 'Apple CarPlay must be true or false',
    }),

    bluetoothConnectivity: Joi.boolean().required().messages({
      'any.required': 'Bluetooth connectivity status is required',
      'boolean.base': 'Bluetooth connectivity must be true or false',
    }),

    usbPorts: Joi.number().integer().min(0).max(10).required().messages({
      'any.required': 'Number of USB ports is required',
      'number.base': 'Number of USB ports must be a number',
      'number.integer': 'Number of USB ports must be an integer',
      'number.min': 'Number of USB ports cannot be negative',
      'number.max': 'Number of USB ports cannot exceed 10',
    }),

    speakers: Joi.number().integer().min(0).max(24).required().messages({
      'any.required': 'Number of speakers is required',
      'number.base': 'Number of speakers must be a number',
      'number.integer': 'Number of speakers must be an integer',
      'number.min': 'Number of speakers cannot be negative',
      'number.max': 'Number of speakers cannot exceed 24',
    }),

    wirelessCharging: Joi.boolean().required().messages({
      'any.required': 'Wireless charging status is required',
      'boolean.base': 'Wireless charging must be true or false',
    }),

    connectedCarFeatures: Joi.boolean().required().messages({
      'any.required': 'Connected car features status is required',
      'boolean.base': 'Connected car features must be true or false',
    }),

    // Lighting
    headlightType: Joi.string().required().trim().messages({
      'any.required': 'Headlight type is required',
      'string.empty': 'Headlight type is required',
    }),

    drl: Joi.boolean().required().messages({
      'any.required': 'DRL status is required',
      'boolean.base': 'DRL must be true or false',
    }),

    fogLights: Joi.boolean().required().messages({
      'any.required': 'Fog lights status is required',
      'boolean.base': 'Fog lights must be true or false',
    }),

    taillightType: Joi.string().required().trim().messages({
      'any.required': 'Taillight type is required',
      'string.empty': 'Taillight type is required',
    }),

    // Additional Features
    ecoMode: Joi.boolean().required().messages({
      'any.required': 'Eco mode status is required',
      'boolean.base': 'Eco mode must be true or false',
    }),

    sportMode: Joi.boolean().required().messages({
      'any.required': 'Sport mode status is required',
      'boolean.base': 'Sport mode must be true or false',
    }),

    driveModes: Joi.array().items(Joi.string()).default([]).messages({
      'array.base': 'Drive modes must be an array',
    }),

    adas: Joi.boolean().required().messages({
      'any.required': 'ADAS status is required',
      'boolean.base': 'ADAS must be true or false',
    }),

    autonomyLevel: Joi.string().trim().optional(),

    // Warranty & Service
    warrantyYears: Joi.number().integer().min(0).max(10).required().messages({
      'any.required': 'Warranty years is required',
      'number.base': 'Warranty years must be a number',
      'number.integer': 'Warranty years must be an integer',
      'number.min': 'Warranty years cannot be negative',
      'number.max': 'Warranty years cannot exceed 10',
    }),

    warrantyKm: Joi.number().integer().min(0).required().messages({
      'any.required': 'Warranty kilometers is required',
      'number.base': 'Warranty kilometers must be a number',
      'number.integer': 'Warranty kilometers must be an integer',
      'number.min': 'Warranty kilometers cannot be negative',
    }),

    freeServices: Joi.number().integer().min(0).max(20).required().messages({
      'any.required': 'Number of free services is required',
      'number.base': 'Number of free services must be a number',
      'number.integer': 'Number of free services must be an integer',
      'number.min': 'Number of free services cannot be negative',
      'number.max': 'Number of free services cannot exceed 20',
    }),
  }),
};

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
