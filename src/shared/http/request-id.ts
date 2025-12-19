import { randomUUID } from 'crypto';
import type { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    requestId?: string;
  }
}

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incomingId = req.header('x-request-id');
  const requestId = incomingId ?? randomUUID();

  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);

  next();
}
