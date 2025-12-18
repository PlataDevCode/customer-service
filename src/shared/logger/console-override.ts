/* eslint-disable no-console */
import { logger } from './logger';

export function overrideConsole() {
  const env = process.env.NODE_ENV ?? 'development';

  if (env === 'development' || env === 'test') return;

  console.log = (...args: unknown[]) => {
    logger.info(formatArgs(args));
  };

  console.info = (...args: unknown[]) => {
    logger.info(formatArgs(args));
  };

  console.warn = (...args: unknown[]) => {
    logger.warn(formatArgs(args));
  };

  console.error = (...args: unknown[]) => {
    logger.error(formatArgs(args));
  };
}

function formatArgs(args: unknown[]) {
  if (args.length === 1) return args[0];
  return args.map(String).join(' ');
}
