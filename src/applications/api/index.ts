import express from 'express'
import { environment } from './../../lib/framework/environment'
import { Application } from "./../../contracts/core/application"

export class ApiApplication implements Application {
  name: 'ApiApplication'

  public async run(): Promise<void> {
    const api = express()

    api.listen(environment.api.port, () => {
      //
    })
  }
}
