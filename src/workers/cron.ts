import { CronApplication } from "./../applications/cron"
import { Application } from "./../contracts/core/application"
import { Worker } from "./../contracts/core/worker"

export class CronWorker implements Worker {
  name = 'CronWorker'
  application: Application = null

  public async start(): Promise<void> {
    this.application = new CronApplication()

    await this.application.run()
  }
}
