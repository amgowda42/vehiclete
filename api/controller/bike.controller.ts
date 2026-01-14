import type { Request, Response } from 'express';

import { Bike } from '../models/bike.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const bikes = async (req: Request, res: Response) => {
  let filter = {};
  if (req.query.brand) {
    filter = { brand: req.query.brand };
  }
  const bikes = await Bike.find(filter).exec();
  ApiResponse.success(res, bikes, 'Bikes fetched successfully', 200);
};

export const getBikeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const bike = await Bike.findById(id).exec();
  if (!bike) {
    throw new AppError('Bike not found', 404);
  }

  ApiResponse.success(res, bike, 'Bike fetched successfully', 200);
};

export const getBikeBrands = async (req: Request, res: Response) => {
  const brands = await Bike.distinct('brand').exec();
  ApiResponse.success(res, brands, 'Bike brands fetched successfully', 200);
};
