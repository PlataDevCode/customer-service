import type { Request, Response } from 'express';
import type { HttpRequest } from './request.js';
import { mapErrorToHttp } from './errors.js';
import { logger } from '../logger/logger.js';

type Handler = (req: HttpRequest) => Promise<unknown>;

export function httpHandler(handler: Handler) {
  return async (req: Request, res: Response) => {
    try {
      const result = await handler({
        body: req.body,
        params: req.params,
        query: req.query as Record<string, string | undefined>,
        headers: req.headers as Record<string, string | undefined>,
      });

      res.status(200).json(result);
    } catch (error) {
      const { statusCode, body } = mapErrorToHttp(error);

      if (statusCode >= 500) {
        console.log(error);
        console.log(error instanceof Error, error?.constructor?.name);
        logger.error('HTTP request failed', {
          error,
          method: req.method,
          path: req.path,
          params: req.params,
          body: req.body,
        });
      }

      res.status(statusCode).json(body);
    }
  };
}
