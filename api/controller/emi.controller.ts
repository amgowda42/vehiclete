import type { Request, Response } from 'express';

import { Types } from 'mongoose';

import { EMI } from '../models/emi.model.js';
import { calculateEmi } from '../services/emi.services.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const upsertEmi = async (req: Request, res: Response) => {
  const { downPayment, interestRate, price, tenureMonths, vehicleId } = req.body as {
    downPayment: number;
    interestRate: number;
    price: number;
    tenureMonths: number;
    vehicleId: string;
  };

  if (!Types.ObjectId.isValid(vehicleId)) {
    throw new AppError('Invalid vehicle id', 400);
  }

  const emiResult = calculateEmi(price, downPayment, interestRate, tenureMonths);

  const emi = await EMI.findOneAndUpdate(
    { vehicleId },
    {
      downPayment,
      interestRate,
      price,
      tenureMonths,
      vehicleId,

      ...emiResult,
    },
    { new: true, upsert: true }
  );

  ApiResponse.success(res, emi, 'EMI details saved', 200);
};

export const getEmiByVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  if (!vehicleId || !Types.ObjectId.isValid(vehicleId)) {
    throw new AppError('Invalid vehicle id', 400); //for safty again checking required field
  }

  const emi = await EMI.findOne({ vehicleId });

  if (!emi) {
    throw new AppError('EMI details not found', 404);
  }

  ApiResponse.success(res, emi, 'EMI details fetched', 200);
};
