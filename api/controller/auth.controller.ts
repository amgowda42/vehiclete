import type { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = jwt;

import type { DecodedToken } from '../middleware/authGuard.js';

import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

interface SignUpRequestBody {
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
}

export const signUp = async (req: Request<object, object, SignUpRequestBody>, res: Response) => {
  const { email, firstName, lastName, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('This Email is already Exist', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    firstName,
    isActive: true,
    lastName: lastName ?? '',
    password: hashedPassword,
    role: 'user',
  });
  ApiResponse.success(res, user, 'user created successfully.', 201);
};

export const login = async (req: Request<object, object, SignUpRequestBody>, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password').exec();

  if (!user) {
    throw new AppError('there is no user found with this email. Please sign up.', 404);
  }

  if (!user.isActive) {
    throw new AppError('User account is deactivated.', 403);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError('Invalid credentials(password).', 401);
  }
  const payload = { email: user.email, id: user._id, role: user.role };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET ?? '', { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET ?? '', { expiresIn: '7d' });

  res.cookie('token', accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  res.cookie('refrsh-token', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  ApiResponse.success(
    res,
    {
      user: {
        email: user.email,
        firstName: user.firstName,
        id: user._id,
        isActive: user.isActive,
        lastName: user.lastName,
        role: user.role,
      },
    },
    'logged in successfully.',
    200
  );
};

export const authCheck = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' }); // manual writing (there is no asyc here)
  }
  const user = req.user;
  ApiResponse.success(res, user, 'user info fetched successfully', 200);
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies as Record<string, string | undefined>;

  if (!refreshToken) {
    throw new AppError('Refresh token not found', 401);
  }

  if (!process.env.REFRESH_SECRET) {
    throw new Error('Server configuration error, cannot read the refresh secret key.');
  }

  let decoded: DecodedToken;

  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET) as DecodedToken;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError('Refresh token expired, please login again', 401);
    }
    if (error instanceof JsonWebTokenError) {
      throw new AppError('Invalid refresh token, please login again', 401);
    }
    throw error;
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (!user.isActive) {
    throw new AppError('User account is deactivated', 403);
  }

  const payload = { email: user.email, id: user._id, role: user.role };
  const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET ?? '', { expiresIn: '15m' });

  res.cookie('token', newAccessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  ApiResponse.success(res, null, 'Access token refreshed successfully', 200);
};

export const logout = (res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  res.clearCookie('refresh-token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  ApiResponse.success(res, null, 'Logged out successfully', 200);
};
