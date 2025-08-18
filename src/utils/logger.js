import { createLogger, format, transports } from 'winston';
const { combine, printf, label, colorize, timestamp } = format;

// Custom format: bold level + timestamp after label
const myFormat = printf(({ level, message, label, timestamp }) => {
  return ` \x1b[1m${level}\x1b[0m                  : ${label} \n [${timestamp}] : ${message}\n\n\n`;
  // \x1b[1m = bold, \x1b[0m = reset
});

const getLogger = (logLabel) => {
  return createLogger({
    level: 'info',
    format: combine(
      colorize({ all: true }),
      label({ label: logLabel }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // add timestamp
      myFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/combined.log' }),
      new transports.File({ filename: 'logs/error.log', level: 'error' })
    ],
  });
};

export default getLogger;
