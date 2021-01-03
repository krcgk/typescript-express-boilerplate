import path from 'path'
import helmet from 'helmet'
import express, { NextFunction } from 'express'
import { environment } from './../../lib/framework/environment'
import { Application } from "./../../contracts/core/application"
import { ioc } from '../../lib/utils'

export class WebApplication implements Application {
  name: 'WebApplication'

  public async run(): Promise<void> {
    const web = express()

    this.registerMiddlewares(web)
    this.registerConfiguration(web)
    this.registerRouters(web)
    this.registerErrorHandler(web)

    web.listen(environment.web.port, () => {
      //
    })
  }

  private registerConfiguration(web: express.Express) {
    web.set('view engine', 'pug')

    web.set('views', path.join(__dirname, '../../../views/default'))

    web.use('/static', express.static(path.join(__dirname, '../../../static')))
  }

  private registerMiddlewares(web: express.Express) {
    web.use(helmet({
      //
    }))
  }

  private registerRouters(web: express.Express) {
    web.get('/', (req: express.Request, res: express.Response) => {
      res.render('pages/index')
    })
  }

  private registerErrorHandler(web: express.Express) {
    web.use(async ( err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
      ioc.logger.error(err)

      res.render('pages/error', {
        error: err.name,
        message: err.message
      })
    })
  }
}
