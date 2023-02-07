import ApiError from '@src/util/errors/api-error';
import { NextFunction, Request, Response } from 'express';

export interface HTTPError extends Error {
  status?: number;
}

export function apiErrorValidator(
  error: HTTPError,
  _: Partial<Request>,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): void {
  const errorCode = error.status || 500;
  res
    .status(errorCode)
    .send(ApiError.format({ code: errorCode, message: error.message }));
}
