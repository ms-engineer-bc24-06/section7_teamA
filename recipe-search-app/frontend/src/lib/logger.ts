// src/lib/logger.ts
const logLevel: string = process.env.NEXT_PUBLIC_LOG_LEVEL || 'warn';

const logger = {
  log: (...args: any[]): void => {
    if (logLevel === 'debug') {
      console.log(...args);
    }
  },
  warn: (...args: any[]): void => {
    if (['debug', 'warn'].includes(logLevel)) {
      console.warn(...args);
    }
  },
  error: (...args: any[]): void => {
    console.error(...args);
  }
};

export default logger;