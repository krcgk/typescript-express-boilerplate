import { v4 } from 'uuid'
import { JobParameter, SerializedJob } from '../../contracts/job/job'

export abstract class BaseJob {
  id: string
  private parameters: JobParameter = {}

  constructor () {
    this.id = v4()
  }

  getParameters(): JobParameter {
    return this.parameters
  }

  setParameters(parameters: JobParameter): void {
    this.parameters = parameters
  }

  getJobName(): string {
    return this.constructor.toString().match(/\w+/g)[1]
  }

  toSerialize(): SerializedJob {
    return {
      jobName: this.getJobName(),
      jobParameters: this.getParameters()
    }
  }
}
