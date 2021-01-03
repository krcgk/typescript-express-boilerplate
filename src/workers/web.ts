import { WebApplication } from "./../applications/web"
import { Application } from "./../contracts/core/application"
import { Worker } from "./../contracts/core/worker"


export class WebWorker implements Worker {
  name = 'WebWorker'
  application: Application = null

  public async start(): Promise<void> {
    this.application = new WebApplication()

    await this.application.run()
  }
}
