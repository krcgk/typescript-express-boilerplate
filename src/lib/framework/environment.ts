import yargs = require('yargs/yargs')
import * as dotenv from 'dotenv'

const argv = yargs(process.argv.slice(2)).options({
  application: { type: 'string', default: 'api' },
  environment: { type: 'string', default: 'local' },
  port: { type: 'number', default: null }
}).argv

dotenv.config({
  path: `${__dirname}/../.${argv.environment}.env`
})

export const environment = {
  environment: argv.environment,
  isProduction: argv.environment === 'production',
  isStaging: argv.environment === 'staging',
  isLocal: argv.environment === 'local',
  isTest: argv.environment === 'test',
  worker: argv.application,
  maintenance: false,
  log: {
    level: 'debug'
  },
  api: {
    port: argv.port || 8121
  },
  web: {
    port: argv.port || 8120
  },
  socket: {
    port: argv.port || 8122
  },
  queue: {
    name: 'main queue'
  },

  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: null
  },

  session: {
    prefix: 'boilerplate',
    secret: 'session-secret'
  }
}
