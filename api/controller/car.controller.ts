import type { Request, Response } from 'express';

import { Car } from '../models/car.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

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
