import type { Request, Response } from 'express';

import { Types } from 'mongoose';

import { BookingDemo } from '../models/demoBooking.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const bookDemo = async (req: Request, res: Response) => {
  const { email, name, phone, preferredDate, preferredTime, vehicleId } = req.body as {
    email: string;
    name: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    vehicleId: string;
  };

  if (!req.user) {
    throw new AppError('Unautheraized.', 401);
  }
  const userId = req.user._id;

  const booking = await BookingDemo.create({
    email,
    name,
    phone,
    preferredDate,
    preferredTime,
    userId,
    vehicleId,
  });

  ApiResponse.success(res, booking, 'Demo booked successfully', 201);
};

export const getAllDemoBookings = async (_req: Request, res: Response) => {
  const bookings = await BookingDemo.find()
    .populate('vehicleId', 'name brand price')
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });

  ApiResponse.success(res, bookings, 'Demo bookings fetched', 200);
};

export const updateDemoStatus = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body as {
    status: 'approved' | 'cancelled' | 'completed';
  };

  if (!bookingId || !Types.ObjectId.isValid(bookingId)) {
    throw new AppError('Invalid booking id', 400);
  }

  const booking = await BookingDemo.findByIdAndUpdate(bookingId, { status }, { new: true });

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  ApiResponse.success(res, booking, 'Status updated', 200);
};
