import { CronJob } from 'cron'
import { JobResult } from '../../contracts/job/job'
import { ioc } from '../utils'
import { JobManager } from "./jobManager"

export class CronManager extends JobManager {

  static readonly everySeconds = '* * * * * *'
  static readonly everyMinutes = '0 * * * * *'
  static readonly everyHour = '0 0 * * * *'
  static readonly everyDay = '0 0 0 * * *'
  static readonly everyMonth = '0 0 0 0 * *'

  public async register(name: string, pattern: string, callback: () => Promise<JobResult>): Promise<void> {
    const cronJob = new CronJob(pattern, async () => {
      ioc.logger.debug(`"${name}" cronjob is running`)
      try {
        const output = await callback()
        ioc.logger.debug(`"${name}" cronjob finished`, output)
      } catch (err) {
        ioc.logger.error(`${name} cronjob failed`, err)
      }
    })

    cronJob.start()

    ioc.logger.debug(`"${name}" cronjob ready for work`)
  }
}
