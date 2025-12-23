import { HttpError } from '../errors/HttpError.js';

type HttpMappableError = {
  statusCode: number;
  code: string;
  message: string;
};

export function mapErrorToHttp(error: unknown): {
  statusCode: number;
  body: { code: string; message: string };
} {
  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      body: {
        code: error.code,
        message: error.message,
      },
    };
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'code' in error &&
    'message' in error
  ) {
    const err = error as HttpMappableError;

    return {
      statusCode: err.statusCode,
      body: {
        code: err.code,
        message: err.message,
      },
    };
  }

  return {
    statusCode: 500,
    body: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    },
  };
}
