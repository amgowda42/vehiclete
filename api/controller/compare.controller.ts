import type { Request, Response } from 'express';

import type { VehicleType } from '../services/compare.services.js';

import { compareVehicles } from '../services/compare.services.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const compareVehiclesController = async (req: Request, res: Response) => {
  const { id1, id2, type } = req.body as {
    id1: string;
    id2: string;
    type: VehicleType;
  };

  if (!id1 || !id2) {
    throw new AppError('Both vehicle IDs must be provided', 400);
  }

  const allowedTypes: VehicleType[] = ['bike', 'car', 'cycle'];
  if (!allowedTypes.includes(type)) {
    throw new AppError(`Invalid vehicle type. Allowed types are: ${allowedTypes.join(', ')}`, 400);
  }

  if (id1 === id2) {
    throw new AppError(
      'Cannot compare the same vehicle. Please provide two different vehicle IDs.',
      400
    );
  }

  const result = await compareVehicles(type, id1, id2);

  ApiResponse.success(res, result, 'Comparison successful', 200);
};
