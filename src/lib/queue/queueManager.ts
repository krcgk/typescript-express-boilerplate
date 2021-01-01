import BullQueue, { Queue, Job as BullJob, DoneCallback } from 'bull'
import { environment } from '../framework/environment'
import { Job, SerializedJob } from '../../contracts/job/job'
import { SampleJob } from '../jobs/example/sampleJob'

export class QueueManager {

  public async push(job: Job): Promise<void> {
    const queue = BullQueue(environment.queue.name, {
      redis: {
        port: environment.redis.port,
        host: environment.redis.host,
        password: environment.redis.password
      }
    })

    queue.add(job.toSerialize(), {
      jobId: job.id
    })
  }

  public async listen(): Promise<Queue> {
    return BullQueue(environment.queue.name, {
      redis: {
        port: environment.redis.port,
        host: environment.redis.host,
        password: environment.redis.password
      }
    })
  }

  public async process(bullJob: BullJob, done: DoneCallback): Promise<void> {
    const serializedJob = bullJob.data as SerializedJob

    const job = this.resolveJob(serializedJob.jobName)

    if (job) {
      job.setParameters(serializedJob.jobParameters)

      const jobResult = await job.run()

      if (jobResult.successful) {
        done(null)
      } else {
        done(new Error(jobResult.message || 'Job errored'))
      }
    } else {
      done(new Error('Invalid Job'))
    }
  }

  private resolveJob(jobName: string): Job {
    let job: Job | null = null
    if (jobName === 'SampleJob') {
      job = new SampleJob()
    }

    return job
  }
}
