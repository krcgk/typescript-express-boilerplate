import 'reflect-metadata'
import { Inject, Service } from "typedi"
import { Worker } from "./../../contracts/core/worker"
import { IoC } from "./ioc"

@Service()
export class Bootstrapper {
  @Inject()
  private ioc: IoC

  private workers: { [key: string]: (ioc: IoC) => Promise<Worker> } = {}

  public async registerWorker(application: string, callback: (ioc: IoC) => Promise<Worker>): Promise<void> {
    this.workers[application] = callback
  }


  public async register(application: string, callback: () => Promise<void>): Promise<Worker> {
    await this.loadLibraries()

    await callback()

    if (!this.workers[application]) {
      throw new Error('Invalid Worker')
    }

    return await this.workers[application](this.ioc)
  }

  private async loadLibraries(): Promise<void> {
    //
  }
}
