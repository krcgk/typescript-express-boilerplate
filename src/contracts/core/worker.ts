import { Application } from "./application";

export interface Worker {
  name: string
  application: Application
  start(): Promise<void>
}
