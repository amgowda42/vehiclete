import type { Request, Response } from 'express';

import { Car } from '../models/car.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

import { uploadToCloudinary } from '../config/cloudinary.js';

import type { ICar } from '../models/car.model.js';

// car.types.ts (or add to your types file)
interface CreateCarRequestBody {
  // Basic Information
  brand: string;
  model: string;
  variant: string;
  year: string | number;
  bodyType: string;
  color: string;
  isAvailable?: string | boolean;
  price: string | number;

  // Engine & Performance
  engineType: string;
  engineCapacity: string | number;
  displacement: string;
  fuelType: string;
  maxPower: string;
  maxTorque: string;
  acceleration: string;
  topSpeed: string;
  driveType: string;
  transmission: string;
  gearbox: string;

  // Fuel & Efficiency
  fuelTankCapacity: string | number;
  mileageCity: string | number;
  mileageHighway: string | number;
  emissionStandard: string;
  range?: string | number;
  batteryCapacity?: string | number;
  chargingTime?: string;

  // Dimensions & Capacity
  length: string | number;
  width: string | number;
  height: string | number;
  wheelbase: string | number;
  groundClearance: string | number;
  kerbWeight: string | number;
  grossWeight: string | number;
  bootSpace: string | number;
  seatingCapacity: string | number;
  doors: string | number;

  // Suspension & Brakes
  frontSuspension: string;
  rearSuspension: string;
  frontBrakeType: string;
  rearBrakeType: string;
  brakingSystem: string;

  // Wheels & Tires
  wheelSize: string;
  tireSize: string;
  spareTire: string;

  // Safety Features
  airbags: string | number;
  abs: string | boolean;
  ebd: string | boolean;
  esc: string | boolean;
  tractionControl: string | boolean;
  hillAssist: string | boolean;
  isofix: string | boolean;
  parkingSensors: string;
  reverseCamera: string | boolean;
  ncapRating?: string | number;

  // Comfort & Convenience
  ac: string;
  powerSteering: string | boolean;
  powerWindows: string;
  adjustableSeats: string;
  cruiseControl: string | boolean;
  keylessEntry: string | boolean;
  pushButtonStart: string | boolean;
  sunroof: string | boolean;
  panoramicSunroof: string | boolean;
  ventilatedSeats: string | boolean;
  heatedSeats: string | boolean;

  // Infotainment & Technology
  infotainmentScreen: string;
  touchscreen: string | boolean;
  androidAuto: string | boolean;
  appleCarPlay: string | boolean;
  bluetoothConnectivity: string | boolean;
  usbPorts: string | number;
  speakers: string | number;
  wirelessCharging: string | boolean;
  connectedCarFeatures: string | boolean;

  // Lighting
  headlightType: string;
  drl: string | boolean;
  fogLights: string | boolean;
  taillightType: string;

  // Additional Features
  ecoMode: string | boolean;
  sportMode: string | boolean;
  driveModes?: string; // JSON string of array
  adas: string | boolean;
  autonomyLevel?: string;

  // Warranty & Service
  warrantyYears: string | number;
  warrantyKm: string | number;
  freeServices: string | number;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

export const cars = async (req: Request, res: Response) => {
  const carList = await Car.find().exec();
  ApiResponse.success(res, carList, 'Car list fetched successfully.', 200);
};

export const getCarById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const car = await Car.findById(id).exec();
  if (!car) {
    throw new AppError('car not found', 404);
  }

  ApiResponse.success(res, car, 'car fetched successfully.', 200);
};

export const createCar = async (
  req: Request<object, object, CreateCarRequestBody>,
  res: Response
) => {
  if (!req.file) {
    throw new AppError('Car image is required', 400);
  }

  console.log('📦 Received body:', req.body);
  console.log('📎 Received file:', req.file);

  // Upload image to Cloudinary
  const result = (await uploadToCloudinary(req.file.buffer, 'cars')) as CloudinaryUploadResult;

  if (!result.secure_url) {
    throw new AppError('Failed to upload image to Cloudinary', 500);
  }

  // Helper to parse boolean from FormData strings
  const toBoolean = (value: unknown): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return false;
  };

  // Helper to parse number safely
  const toNumber = (value: unknown): number => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Helper to parse array from string
  const toArray = (value: unknown): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  // Build car data with proper typing
  const carData: Partial<ICar> = {
    // Basic Information
    brand: req.body.brand,
    model: req.body.model,
    variant: req.body.variant,
    year: toNumber(req.body.year),
    bodyType: req.body.bodyType as ICar['bodyType'],
    color: req.body.color,
    imageUrl: result.secure_url,
    isAvailable: req.body.isAvailable !== undefined ? toBoolean(req.body.isAvailable) : true,
    price: toNumber(req.body.price),

    // Engine & Performance
    engineType: req.body.engineType,
    engineCapacity: toNumber(req.body.engineCapacity),
    displacement: req.body.displacement,
    fuelType: req.body.fuelType,
    maxPower: req.body.maxPower,
    maxTorque: req.body.maxTorque,
    acceleration: req.body.acceleration,
    topSpeed: req.body.topSpeed,
    driveType: req.body.driveType,
    transmission: req.body.transmission,
    gearbox: req.body.gearbox,

    // Fuel & Efficiency
    fuelTankCapacity: toNumber(req.body.fuelTankCapacity),
    mileageCity: toNumber(req.body.mileageCity),
    mileageHighway: toNumber(req.body.mileageHighway),
    emissionStandard: req.body.emissionStandard,

    // Dimensions & Capacity
    length: toNumber(req.body.length),
    width: toNumber(req.body.width),
    height: toNumber(req.body.height),
    wheelbase: toNumber(req.body.wheelbase),
    groundClearance: toNumber(req.body.groundClearance),
    kerbWeight: toNumber(req.body.kerbWeight),
    grossWeight: toNumber(req.body.grossWeight),
    bootSpace: toNumber(req.body.bootSpace),
    seatingCapacity: toNumber(req.body.seatingCapacity),
    doors: toNumber(req.body.doors),

    // Suspension & Brakes
    frontSuspension: req.body.frontSuspension,
    rearSuspension: req.body.rearSuspension,
    frontBrakeType: req.body.frontBrakeType,
    rearBrakeType: req.body.rearBrakeType,
    brakingSystem: req.body.brakingSystem,

    // Wheels & Tires
    wheelSize: req.body.wheelSize,
    tireSize: req.body.tireSize,
    spareTire: req.body.spareTire,

    // Safety Features
    airbags: toNumber(req.body.airbags),
    abs: toBoolean(req.body.abs),
    ebd: toBoolean(req.body.ebd),
    esc: toBoolean(req.body.esc),
    tractionControl: toBoolean(req.body.tractionControl),
    hillAssist: toBoolean(req.body.hillAssist),
    isofix: toBoolean(req.body.isofix),
    parkingSensors: req.body.parkingSensors,
    reverseCamera: toBoolean(req.body.reverseCamera),

    // Comfort & Convenience
    ac: req.body.ac,
    powerSteering: toBoolean(req.body.powerSteering),
    powerWindows: req.body.powerWindows,
    adjustableSeats: req.body.adjustableSeats,
    cruiseControl: toBoolean(req.body.cruiseControl),
    keylessEntry: toBoolean(req.body.keylessEntry),
    pushButtonStart: toBoolean(req.body.pushButtonStart),
    sunroof: toBoolean(req.body.sunroof),
    panoramicSunroof: toBoolean(req.body.panoramicSunroof),
    ventilatedSeats: toBoolean(req.body.ventilatedSeats),
    heatedSeats: toBoolean(req.body.heatedSeats),

    // Infotainment & Technology
    infotainmentScreen: req.body.infotainmentScreen,
    touchscreen: toBoolean(req.body.touchscreen),
    androidAuto: toBoolean(req.body.androidAuto),
    appleCarPlay: toBoolean(req.body.appleCarPlay),
    bluetoothConnectivity: toBoolean(req.body.bluetoothConnectivity),
    usbPorts: toNumber(req.body.usbPorts),
    speakers: toNumber(req.body.speakers),
    wirelessCharging: toBoolean(req.body.wirelessCharging),
    connectedCarFeatures: toBoolean(req.body.connectedCarFeatures),

    // Lighting
    headlightType: req.body.headlightType,
    drl: toBoolean(req.body.drl),
    fogLights: toBoolean(req.body.fogLights),
    taillightType: req.body.taillightType,

    // Additional Features
    ecoMode: toBoolean(req.body.ecoMode),
    sportMode: toBoolean(req.body.sportMode),
    adas: toBoolean(req.body.adas),

    // Warranty & Service
    warrantyYears: toNumber(req.body.warrantyYears),
    warrantyKm: toNumber(req.body.warrantyKm),
    freeServices: toNumber(req.body.freeServices),
  };

  // Add optional fields if they exist
  if (req.body.range !== undefined) {
    carData.range = toNumber(req.body.range);
  }
  if (req.body.batteryCapacity !== undefined) {
    carData.batteryCapacity = toNumber(req.body.batteryCapacity);
  }
  if (req.body.chargingTime !== undefined) {
    carData.chargingTime = req.body.chargingTime;
  }
  if (req.body.ncapRating !== undefined) {
    carData.ncapRating = toNumber(req.body.ncapRating);
  }
  if (req.body.driveModes !== undefined) {
    carData.driveModes = toArray(req.body.driveModes);
  }
  if (req.body.autonomyLevel !== undefined) {
    carData.autonomyLevel = req.body.autonomyLevel;
  }

  console.log('💾 Creating car with data:', carData);

  // Create new car
  const car = await Car.create(carData as ICar);

  ApiResponse.success(res, car, 'Car created successfully', 201);
};

export const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  const car = await Car.findById(id);
  if (!car) {
    throw new AppError('Car not found', 404);
  }

  await Car.findByIdAndDelete(id);

  ApiResponse.success(res, null, 'Car deleted successfully', 200);
};
