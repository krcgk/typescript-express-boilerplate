import http from 'http'
import express from 'express'
import socketIO from 'socket.io'
import { Application } from "./../../contracts/core/application"
import { environment } from '../../lib/framework/environment'
import { ioc } from '../../lib/utils'

export class SocketApplication implements Application {
  name: 'SocketApplication'

  public async run(): Promise<void> {
    const socket = express()
    const server = new http.Server(socket)
    const io = new socketIO.Server(server, {
      serveClient: false
    })

    io.on("connection", function (socket: socketIO.Socket) {
      ioc.logger.debug(`a user connected: ${socket.id}`)
    })

    server.listen(environment.socket.port, function () {
      //
    })
  }

}
