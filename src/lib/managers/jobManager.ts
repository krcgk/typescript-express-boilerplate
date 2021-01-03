import { Job } from "../../contracts/job/job"
import { SampleJob } from "../jobs/example/sampleJob"

export class JobManager {
  public jobResolver(jobName: string): Job {
    let job: Job | null = null
    if (jobName === 'SampleJob') {
      job = new SampleJob()
    }

    return job
  }
}
