import type { Request, Response } from 'express';

import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

interface UpdateUserBody {
  email?: string;
  firstName?: string;
  isActive?: boolean;
  lastName?: string;
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().exec();
  ApiResponse.success(res, users, 'All User fetched Successfully.');
};

export const getUsersCount = async (req: Request, res: Response) => {
  const [totalUsers, totalAdmins, totalRegularUsers] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ role: 'admin' }),
    User.countDocuments({ role: 'user' }),
  ]);

  ApiResponse.success(
    res,
    {
      totalAdmins,
      totalRegularUsers,
      totalUsers,
    },
    'User count fetched successfully',
    200
  );
};

export const UpdateUser = async (
  req: Request<{ id: string }, object, UpdateUserBody>,
  res: Response
) => {
  const { id } = req.params;
  const updateData = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User Not Found', 404);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  ApiResponse.success(res, updatedUser, 'User updated successfully', 200);
};
