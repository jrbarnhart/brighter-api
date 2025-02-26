import { createLogger, format, LoggerOptions, transports } from 'winston';
import 'winston-daily-rotate-file';

// Log format
const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${
    stack ? `${message}\n${stack}` : message
  }`;
});

// Options for console logs
const options: {
  console: transports.ConsoleTransportOptions;
} = {
  console: {
    level: 'silly',
  },
};

// Error logs rotation
const errorRotateTransport = new transports.DailyRotateFile({
  filename: `logs/error-%DATE%.log`, // Error logs with timestamp
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
});

// Combined logs rotation
const combinedRotateTransport = new transports.DailyRotateFile({
  filename: `logs/combined-%DATE%.log`, // General logs with timestamp
  datePattern: 'YYYY-MM-DD',
  level: 'info',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
});

// Dev environment logging
const devLogger: LoggerOptions = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat,
  ),
  transports: [new transports.Console(options.console)],
};

// Prod environment logging
const prodLogger: LoggerOptions = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [errorRotateTransport, combinedRotateTransport],
};

// Export a single instance of logger based on environment
const instanceLogger =
  process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const instance = createLogger(instanceLogger);
