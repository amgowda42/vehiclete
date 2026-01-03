import type { Request, Response } from 'express';

import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

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
