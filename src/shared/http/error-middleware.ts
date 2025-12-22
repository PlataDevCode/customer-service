import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger.js';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error(err.message, {
    stack: err.stack,
    method: req.method,
    path: req.path,
  });

  res.status(500).json({
    error: 'Internal server error',
  });
}
