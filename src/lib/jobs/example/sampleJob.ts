import { Job, JobResult } from "../../../contracts/job/job"
import { BaseJob } from "../baseJob"

export class SampleJob extends BaseJob implements Job {
  public async run(): Promise<JobResult> {
    return {
      successful: true
    }
  }
}
