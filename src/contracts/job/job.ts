export interface Job {
  id: string
  getParameters(): JobParameter
  setParameters(parameters: JobParameter): void
  toSerialize(): SerializedJob
  run(): Promise<JobResult>
}

export type JobResult = {
  successful: boolean
  message?: string
  payload?: any
}

export type SerializedJob = {
  jobName: string
  jobParameters: JobParameter
}

export type JobParameter = {
  [key: string]: any
}
