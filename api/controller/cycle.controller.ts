import type { Request, Response } from 'express';

import { Cycle } from '../models/cycle.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const cycles = async (req: Request, res: Response) => {
  const filter: Record<string, Record<string, string> | string> = {};
  if (req.query.brand) {
    filter.brand = req.query.brand as string;
  }

  if (req.query.category) {
    filter.category = req.query.category as string;
  }

  const cycleList = await Cycle.find(filter).exec();
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

export const getCycleBrands = async (req: Request, res: Response) => {
  const brands = await Cycle.distinct('brand').exec();
  ApiResponse.success(res, brands, 'Cycle brands fetched successfully', 200);
};

export const getCycleCategories = async (req: Request, res: Response) => {
  let filter = {};
  if (req.query.category) {
    filter = { brand: req.query.category };
  }
  const categories = await Cycle.distinct('category', filter).exec();
  ApiResponse.success(res, categories, 'Cycle categories fetched successfully', 200);
};
