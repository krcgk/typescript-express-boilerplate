import { DoneCallback, Job } from "bull"
import { QueueManager } from "../../lib/managers/queueManager"
import { Application } from "./../../contracts/core/application"

export class QueueApplication implements Application {
  name: 'QueueApplication'

  public async run(): Promise<void> {
    const queueManager = new QueueManager()

    const queue = await queueManager.listen()

    queue.process(async (job: Job, done: DoneCallback) => {
      await queueManager.process(job, done)
    })
  }

}
