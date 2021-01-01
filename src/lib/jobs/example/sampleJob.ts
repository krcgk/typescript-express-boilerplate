import { Job, JobResult } from "../../../contracts/job/job"
import { ioc } from "../../utils"
import { BaseJob } from "../baseJob"

export class SampleJob extends BaseJob implements Job {
  public async run(): Promise<JobResult> {
    ioc.logger.debug('Sample Job is worked')

    return {
      successful: true
    }
  }
}
