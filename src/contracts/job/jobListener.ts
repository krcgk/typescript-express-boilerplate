import { Job } from "./job"

export interface JobListener {
  handle(job: Job): Promise<void>
}
