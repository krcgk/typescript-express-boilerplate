import { Logger as WinstonLogger, createLogger, transports, format } from 'winston'
import { environment } from './environment'

export class Logger {
  private logger: WinstonLogger

  constructor () {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: environment.log.level,
          handleExceptions: true,
          format: environment.isLocal
            ? format.combine(
              format.colorize(),
              format.splat()
            )
            : format.combine(
              format.json()
            )
        })
      ]
    })
  }

  public info(...args: any[]): void {
    this.logger.info(args)
  }

  public debug(...args: any[]): void {
    this.logger.info(args)
  }

  public warn(...args: any[]): void {
    this.logger.warn(args)
  }

  public error(...args: any[]): void {
    this.logger.error(args)
  }
}
