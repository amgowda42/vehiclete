import type { Request, Response } from 'express';

import type { IBike } from '../models/bike.model.js';

import { uploadToCloudinary } from '../config/cloudinary.js';
import { Bike } from '../models/bike.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

interface CreateBikeRequestBody {
  abs: boolean | string;
  acceleration: string;
  brakingSystem: string;
  brand: string;
  caliperType: string;
  color: string;
  coolingSystem: string;
  displacement: string;
  engineCapacity: number | string;
  frontBrakeType: string;
  frontSuspension: string;
  fuelTankCapacity: number | string;
  groundClearance?: number | string;
  isAvailable?: boolean | string;
  kerbWeight: number | string;
  maxPower: string;
  maxTorque: string;
  mileage: number | string;
  model: string;
  price: number | string;
  quickShifter: boolean | string;
  rearBrakeType: string;
  rearSuspension: string;
  seatHeight: number | string;
  seatLength: number | string;
  topSpeed: string;
  transmission: string;
  varient: string;
  year: number | string;
}

export const bikes = async (req: Request, res: Response) => {
  const bikeList = await Bike.find().exec();
  ApiResponse.success(res, bikeList, 'Bike list fetched successfully.', 200);
};

export const getBikeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const bike = await Bike.findById(id).exec();
  if (!bike) {
    throw new AppError('Bike not found', 404);
  }

  ApiResponse.success(res, bike, 'Bike fetched successfully', 200);
};

export const createBike = async (
  req: Request<object, object, CreateBikeRequestBody>,
  res: Response
) => {
  if (!req.file) {
    throw new AppError('Bike image is required', 400);
  }

  console.log('📦 Received body:', req.body);
  console.log('📎 Received file:', req.file);

  // Upload image to Cloudinary
  const result = (await uploadToCloudinary(req.file.buffer)) as CloudinaryUploadResult;

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

  // Build bike data with proper typing
  const bikeData: Partial<IBike> = {
    abs: toBoolean(req.body.abs),
    acceleration: req.body.acceleration,
    brakingSystem: req.body.brakingSystem,
    brand: req.body.brand,
    caliperType: req.body.caliperType,
    color: req.body.color,
    coolingSystem: req.body.coolingSystem,
    displacement: req.body.displacement,
    engineCapacity: toNumber(req.body.engineCapacity),
    frontBrakeType: req.body.frontBrakeType,
    frontSuspension: req.body.frontSuspension,
    fuelTankCapacity: toNumber(req.body.fuelTankCapacity),
    imageUrl: result.secure_url,
    isAvailable: req.body.isAvailable !== undefined ? toBoolean(req.body.isAvailable) : true,
    kerbWeight: toNumber(req.body.kerbWeight),
    maxPower: req.body.maxPower,
    maxTorque: req.body.maxTorque,
    mileage: toNumber(req.body.mileage),
    model: req.body.model,
    price: toNumber(req.body.price),
    quickShifter: toBoolean(req.body.quickShifter),
    rearBrakeType: req.body.rearBrakeType,
    rearSuspension: req.body.rearSuspension,
    seatHeight: toNumber(req.body.seatHeight),
    seatLength: toNumber(req.body.seatLength),
    topSpeed: req.body.topSpeed,
    transmission: req.body.transmission,
    varient: req.body.varient,
    year: toNumber(req.body.year),
  };

  // Add groundClearance if it exists
  if (req.body.groundClearance !== undefined) {
    bikeData.groundClearance = toNumber(req.body.groundClearance);
  }

  console.log('💾 Creating bike with data:', bikeData);

  // Create new bike
  const bike = await Bike.create(bikeData as IBike);

  ApiResponse.success(res, bike, 'Bike created successfully', 201);
};

export const deleteBike = async (req: Request, res: Response) => {
  const { id } = req.params;

  const bike = await Bike.findById(id);
  if (!bike) {
    throw new AppError('Bike not found', 404);
  }

  await Bike.findByIdAndDelete(id);

  ApiResponse.success(res, null, 'Bike deleted successfully', 200);
};
