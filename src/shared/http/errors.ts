import { AppError } from '../errors/AppError';

export function mapErrorToHttp(error: unknown): {
  statusCode: number;
  body: { code: string; message: string };
} {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: {
        code: error.code,
        message: error.message,
      },
    };
  }

  return {
    statusCode: 500,
    body: {
      code: 'InternalServerError',
      message: 'Internal server error',
    },
  };
}
