import type { Request, Response } from 'express';

import { Bike } from '../models/bike.model.js';
import { Car } from '../models/car.model.js';
import { Cycle } from '../models/cycle.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getVehicleStats = async (req: Request, res: Response) => {
  const [totalBikes, availableBikes] = await Promise.all([
    Bike.countDocuments(),
    Bike.countDocuments({ isAvailable: true }),
  ]);

  const [totalCars, availableCars] = await Promise.all([
    Car.countDocuments(),
    Car.countDocuments({ isAvailable: true }),
  ]);

  const [totalCycles, availableCycles] = await Promise.all([
    Cycle.countDocuments(),
    Cycle.countDocuments({ isAvailable: true }),
  ]);

  const stats = {
    bikes: {
      available: availableBikes,
      total: totalBikes,
      unavailable: totalBikes - availableBikes,
    },
    cars: {
      available: availableCars,
      total: totalCars,
      unavailable: totalCars - availableCars,
    },
    cycles: {
      available: availableCycles,
      total: totalCycles,
      unavailable: totalCycles - availableCycles,
    },
    summary: {
      totalAvailable: availableBikes + availableCars + availableCycles,
      totalUnavailable:
        totalBikes - availableBikes + (totalCars - availableCars) + (totalCycles - availableCycles),
      totalVehicles: totalBikes + totalCars + totalCycles,
    },
  };

  ApiResponse.success(res, stats, 'Vehicle statistics fetched successfully', 200);
};