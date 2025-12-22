import type { Request, Response } from 'express';

import { Bike } from '../models/bike.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const bikes = async (req: Request, res: Response) => {
  const bikeList = await Bike.find({ isAvailable: true }).exec();
  ApiResponse.success(res, bikeList, 'Bike list fetched successfully.', 200);
};
