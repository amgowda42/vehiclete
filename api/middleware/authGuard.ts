import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

import pkg from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError, verify } = pkg;

import type { IUser } from '../models/user.model.js';

import { User } from '../models/user.model.js';
import AppError from '../utils/AppError.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

export interface DecodedToken extends JwtPayload {
  email: string;
  id: string;
  role: string;
}

export const authGuard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.cookies as Record<string, string | undefined>;

  if (!token) {
    throw new AppError('Not authorized, no token', 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('Server configuration error, cannot read the jwt secret key.');
  }

  let decoded: DecodedToken;

  try {
    decoded = verify(token, process.env.JWT_SECRET) as DecodedToken;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError('Token expired, please login again', 401);
    }
    if (error instanceof JsonWebTokenError) {
      throw new AppError('Invalid token, please login again', 401);
    }
    throw error;
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError('Not authorized, user not found', 404);
  }

  req.user = user;

  next();
};
