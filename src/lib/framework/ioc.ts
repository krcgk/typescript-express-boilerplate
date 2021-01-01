import 'reflect-metadata'
import { Inject, Service } from "typedi"
import { Logger } from './logger'

@Service()
export class IoC {
  @Inject()
  logger: Logger
}
