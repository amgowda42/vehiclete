import type { Request, Response } from 'express';

import { Bike } from '../models/bike.model.js';
import { Car } from '../models/car.model.js';
import { Cycle } from '../models/cycle.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const getVehicleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const vehicle =
    (await Bike.findById(id).exec()) ??
    (await Car.findById(id).exec()) ??
    (await Cycle.findById(id).exec());

  if (!vehicle) {
    throw new AppError('Vehicle not found', 404);
  }

  ApiResponse.success(res, vehicle, 'Vehicle fetched successfully', 200);
};
