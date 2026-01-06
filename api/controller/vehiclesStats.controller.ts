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

/**
 * Get statistics for a specific vehicle type
 */
// export const getVehicleStatsByType = async (req: Request, res: Response) => {
//   const { type } = req.params; // 'bikes', 'cars', or 'cycles'

//   let Model;
//   let vehicleType: string;

//   switch (type.toLowerCase()) {
//     case 'bikes':
//       Model = Bike;
//       vehicleType = 'bikes';
//       break;
//     case 'cars':
//       Model = Car;
//       vehicleType = 'cars';
//       break;
//     case 'cycles':
//       Model = Cycle;
//       vehicleType = 'cycles';
//       break;
//     default:
//       return ApiResponse.error(res, 'Invalid vehicle type. Use: bikes, cars, or cycles', 400);
//   }

//   const [total, available] = await Promise.all([
//     Model.countDocuments(),
//     Model.countDocuments({ isAvailable: true }),
//   ]);

//   const stats = {
//     type: vehicleType,
//     total,
//     available,
//     unavailable: total - available,
//     availabilityPercentage: total > 0 ? ((available / total) * 100).toFixed(2) : '0.00',
//   };

//   ApiResponse.success(res, stats, `${vehicleType} statistics fetched successfully`, 200);
// };

/**
 * Get detailed statistics with breakdown by brand/model
 */
// export const getDetailedVehicleStats = async (req: Request, res: Response) => {
//   // Bike stats by brand
//   const bikesByBrand = await Bike.aggregate([
//     {
//       $group: {
//         _id: '$brand',
//         total: { $sum: 1 },
//         available: {
//           $sum: { $cond: [{ $eq: ['$isAvailable', true] }, 1, 0] },
//         },
//       },
//     },
//     {
//       $project: {
//         brand: '$_id',
//         total: 1,
//         available: 1,
//         unavailable: { $subtract: ['$total', '$available'] },
//         _id: 0,
//       },
//     },
//     { $sort: { brand: 1 } },
//   ]);

//   // Similar aggregations for cars and cycles
//   const carsByBrand = await Car.aggregate([
//     {
//       $group: {
//         _id: '$brand',
//         total: { $sum: 1 },
//         available: {
//           $sum: { $cond: [{ $eq: ['$isAvailable', true] }, 1, 0] },
//         },
//       },
//     },
//     {
//       $project: {
//         brand: '$_id',
//         total: 1,
//         available: 1,
//         unavailable: { $subtract: ['$total', '$available'] },
//         _id: 0,
//       },
//     },
//     { $sort: { brand: 1 } },
//   ]);

//   const cyclesByBrand = await Cycle.aggregate([
//     {
//       $group: {
//         _id: '$brand',
//         total: { $sum: 1 },
//         available: {
//           $sum: { $cond: [{ $eq: ['$isAvailable', true] }, 1, 0] },
//         },
//       },
//     },
//     {
//       $project: {
//         brand: '$_id',
//         total: 1,
//         available: 1,
//         unavailable: { $subtract: ['$total', '$available'] },
//         _id: 0,
//       },
//     },
//     { $sort: { brand: 1 } },
//   ]);

//   const detailedStats = {
//     bikes: {
//       byBrand: bikesByBrand,
//       total: bikesByBrand.reduce((sum, b) => sum + b.total, 0),
//       available: bikesByBrand.reduce((sum, b) => sum + b.available, 0),
//     },
//     cars: {
//       byBrand: carsByBrand,
//       total: carsByBrand.reduce((sum, c) => sum + c.total, 0),
//       available: carsByBrand.reduce((sum, c) => sum + c.available, 0),
//     },
//     cycles: {
//       byBrand: cyclesByBrand,
//       total: cyclesByBrand.reduce((sum, c) => sum + c.total, 0),
//       available: cyclesByBrand.reduce((sum, c) => sum + c.available, 0),
//     },
//   };

//   ApiResponse.success(res, detailedStats, 'Detailed vehicle statistics fetched successfully', 200);
// };
