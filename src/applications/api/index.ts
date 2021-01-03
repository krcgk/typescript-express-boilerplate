import cors from 'cors'
import helmet from 'helmet'
import express, { NextFunction } from 'express'
import { environment } from './../../lib/framework/environment'
import { Application } from "./../../contracts/core/application"
import { apiRouter } from './routers/apiRouter'
import { BaseError } from '../../lib/errors/baseError'
import { ioc } from '../../lib/utils'
import { maintenanceMiddleware } from './middlewares'

export class ApiApplication implements Application {
  name: 'ApiApplication'

  public async run(): Promise<void> {
    const api = express()

    this.registerMiddlewares(api)
    this.registerRouters(api)
    this.registerErrorHandler(api)

    api.listen(environment.api.port, () => {
      //
    })
  }

  private registerMiddlewares(api: express.Express) {
    // Cors Middleware
    api.use(cors({
      //
    }))

    // Helmet Middleware
    api.use(helmet({
      //
    }))

    // Maintenance
    api.use(maintenanceMiddleware)
  }

  private registerRouters(api: express.Express) {
    api.use(apiRouter)
  }

  private registerErrorHandler(api: express.Express) {
    api.use(async ( err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
      if (err instanceof BaseError) {
        ioc.logger.error('ApiApplication', err)

        res.status(err.httpCode).json({
          error: {
            status: err.httpCode,
            type: err.name,
            message: err.message
          }
        })
      } else {
        ioc.logger.error('ApiApplication', err)

        res.status(500).json({
          error: {
            status: 500,
            type: environment.isProduction ? 'IntervalServerError' : err.name,
            error: environment.isProduction ? 'Please try again' : err.message
          }
        })
      }
    })
  }
}
