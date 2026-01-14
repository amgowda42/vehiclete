import type { Request, Response } from 'express';

import { Car } from '../models/car.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const cars = async (req: Request, res: Response) => {
  let filter = {};
  if (req.query.brand) {
    filter = { brand: req.query.brand };
  }
  const carList = await Car.find(filter).exec();
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

export const getCarBrands = async (req: Request, res: Response) => {
  const brands = await Car.distinct('brand').exec();
  ApiResponse.success(res, brands, 'Car brands fetched successfully.', 200);
};
