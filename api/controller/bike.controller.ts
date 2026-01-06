import type { Request, Response } from 'express';

import { uploadToCloudinary } from '../config/cloudinary.js';
import { Bike } from '../models/bike.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

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

export const createBike = async (req: Request, res: Response) => {
  // Validate image is uploaded
  if (!req.file) {
    throw new AppError('Bike image is required', 400);
  }

  const abs = req.body.abs === 'true' || req.body.abs === true;

  console.log('✅ Parsed abs value:', abs);

  const result = await uploadToCloudinary(req.file.buffer);

  if (!result || typeof result !== 'object' || !('secure_url' in result)) {
    throw new AppError('Failed to upload image to Cloudinary', 500);
  }

  const bikeData = {
    abs,
    imageUrl: result.secure_url as string,
  };

  console.log('💾 Creating bike with data:', bikeData);

  // Create new bike
  const bike = await Bike.create(bikeData);

  console.log('✅ Bike created successfully:', bike._id);

  ApiResponse.success(res, bike, 'Bike created successfully', 201);
};

export const updateBike = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log('📝 Update request - ID:', id);
  console.log('📝 Update body:', req.body);
  console.log('📎 Update file:', req.file);

  // Find existing bike
  const existingBike = await Bike.findById(id);
  if (!existingBike) {
    throw new AppError('Bike not found', 404);
  }

  // Parse update data
  const updateData: any = {};

  // Parse boolean from FormData if provided
  if (req.body.abs !== undefined) {
    updateData.abs = req.body.abs === 'true' || req.body.abs === true;
  }

  // Handle image upload if new image is provided
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);

    if (!result || typeof result !== 'object' || !('secure_url' in result)) {
      throw new AppError('Failed to upload image to Cloudinary', 500);
    }

    updateData.imageUrl = result.secure_url as string;
  }

  console.log('💾 Updating bike with data:', updateData);

  // Update bike
  const updatedBike = await Bike.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  ApiResponse.success(res, updatedBike, 'Bike updated successfully', 200);
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
