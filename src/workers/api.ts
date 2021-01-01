import { ApiApplication } from "./../applications/api"
import { Application } from "./../contracts/core/application"
import { Worker } from "./../contracts/core/worker"


export class ApiWorker implements Worker {
  name = 'ApiWorker'
  application: Application = null

  public async start(): Promise<void> {
    this.application = new ApiApplication()

    await this.application.run()
  }
}
