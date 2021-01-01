/**
 * Typescript IoC based Api Project
 *
 * Gökhan Karaca <mail@gokhankaraca.com>
 */

import { Container } from "typedi"
import { environment } from "./lib/framework/environment"
import { Bootstrapper } from "./lib/framework/bootstrapper"
import { ApiWorker } from "./workers/api"
import { CronWorker } from "./workers/cron"
import { QueueWorker } from "./workers/queue"
import { SocketWorker } from "./workers/socket"
import { Worker } from "./contracts/core/worker"
import { ioc } from "./lib/utils"

const bootstrapper = Container.get(Bootstrapper)

bootstrapper.register(environment.worker, async () => {

  await bootstrapper.registerWorker('api', async () => {
    return new ApiWorker()
  })

  await bootstrapper.registerWorker('socket', async () => {
    return new SocketWorker()
  })

  await bootstrapper.registerWorker('cron', async () => {
    return new CronWorker()
  })

  await bootstrapper.registerWorker('queue', async () => {
    return new QueueWorker()
  })

}).then(async (worker: Worker) => {

  worker.start().then(() => {
    ioc.logger.debug(`${worker.name} started`)
  }).catch((err) => {
    ioc.logger.error(`${worker.name} failed`, err)
  })

}).catch((err) => {
  ioc.logger.error(`bootstrapper failed`, err)
})
