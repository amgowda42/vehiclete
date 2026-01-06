import type { Request, Response } from 'express';

import { Cycle } from '../models/cycle.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const cycles = async (req: Request, res: Response) => {
  const cycleList = await Cycle.find().exec();
  ApiResponse.success(res, cycleList, 'Cycle list fetched successfully.', 200);
};

export const getCycleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cycle = await Cycle.findById(id).exec();
  if (!cycle) {
    throw new AppError('Cycle not found', 404);
  }

  ApiResponse.success(res, cycle, 'Cycle fetched successfully', 200);
};
