import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json, colorize, printf } = winston.format;

const env = process.env.NODE_ENV ?? 'development';

const isLocal = env === 'development';
const isTest = env === 'test';
const isServerless = env === 'staging' || env === 'production';

const consoleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const transports: winston.transport[] = [];

if (!isTest) {
  transports.push(
    new winston.transports.Console({
      level: process.env.LOG_LEVEL ?? 'info',
      format: isServerless
        ? combine(timestamp(), json())
        : combine(colorize({ all: true }), timestamp(), consoleFormat),
    }),
  );
}

if (isLocal) {
  transports.push(
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM',
      maxSize: '20m',
      maxFiles: '24',
      zippedArchive: true,
      format: combine(timestamp(), json()),
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM',
      maxSize: '20m',
      maxFiles: '24',
      zippedArchive: true,
      format: combine(timestamp(), json()),
    }),
  );
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  transports,
});
