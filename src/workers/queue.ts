import { QueueApplication } from "./../applications/queue"
import { Application } from "./../contracts/core/application"
import { Worker } from "./../contracts/core/worker"

export class QueueWorker implements Worker {
  name = 'QueueWorker'
  application: Application = null

  public async start(): Promise<void> {
    this.application = new QueueApplication()

    await this.application.run()
  }
}
