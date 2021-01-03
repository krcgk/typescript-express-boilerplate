import { SampleJob } from "../../lib/jobs/example/sampleJob"
import { CronManager } from "../../lib/managers/cronManager"
import { Application } from "./../../contracts/core/application"

export class CronApplication implements Application {
  name: 'CronApplication'

  public async run(): Promise<void> {
    const cronManager = new CronManager()

    cronManager.register('Sample', CronManager.everyMinutes, async () => {
      const job = new SampleJob()

      return await job.run()
    })
  }

}
