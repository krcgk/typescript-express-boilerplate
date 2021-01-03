import { Logger as WinstonLogger, createLogger, transports, format } from 'winston'
import { environment } from './environment'

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
  }
}

const formatter = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.splat(),
  format.printf((info) => {
    const { timestamp, level, message, ...meta } = info

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`
  })
)

export class Logger {
  private logger: WinstonLogger

  constructor () {
    this.logger = createLogger({
      level: environment.isProduction ? 'error' : 'trace',
      levels: customLevels.levels,
      transports: [
        new transports.Console({
          handleExceptions: true,
          format: formatter
        })
      ]
    })
  }

  public trace(message: any,...args: any[]): void {
    this.logger.log('trace', message, args)
  }

  public info(message: any,...args: any[]): void {
    this.logger.info(message, args)
  }

  public debug(message: any, ...args: any[]): void {
    this.logger.debug(message, args)
  }

  public warn(message: any, ...args: any[]): void {
    this.logger.warn(message, args)
  }

  public error(message: any, ...args: any[]): void {
    this.logger.error(message, args)
  }

  public fatal(message: any,...args: any[]): void {
    this.logger.log('fatal', message, args)
  }
}
