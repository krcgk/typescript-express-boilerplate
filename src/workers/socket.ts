import { SocketApplication } from "./../applications/socket"
import { Application } from "./../contracts/core/application"
import { Worker } from "./../contracts/core/worker"

export class SocketWorker implements Worker {
  name = 'SocketWorker'
  application: Application = null

  public async start(): Promise<void> {
    this.application = new SocketApplication()

    await this.application.run()
  }
}
