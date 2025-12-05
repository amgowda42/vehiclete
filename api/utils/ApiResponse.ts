import type { Response } from 'express';

interface ApiResponseData {
  data: unknown;
  message: string;
  success: boolean;
}

export const ApiResponse = {
  success: (
    res: Response,
    data: unknown = null,
    message = 'Success',
    statusCode = 200
  ): Response => {
    const responseData: ApiResponseData = {
      data,
      message,
      success: true,
    };

    return res.status(statusCode).json(responseData);
  },
};
