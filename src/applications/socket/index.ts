import http from 'http'
import { v4 } from 'uuid'
import { Server } from 'ws'
import { NativeWebSocket } from '../../contracts/core/websocket'
import { environment } from '../../lib/framework/environment'
import { Application } from "./../../contracts/core/application"

export class SocketApplication implements Application {
  name: 'SocketApplication'

  wss: Server

  public async run(): Promise<void> {
    const server = http.createServer()

    server.listen(environment.socket.port)

    this.wss = new Server({
      server: server
    })

    this.wss.on('connection', (ws: NativeWebSocket) => {
      ws.id = v4()
      ws.isAlive = true

      ws.on('pong', () => {
        ws.isAlive = true
      })

      ws.on('close', () => {
        ws.isAlive = false
      })
    })

    setInterval(()=>{
      this.wss.clients.forEach((ws: NativeWebSocket) => {
        if (ws.isAlive === false){
          return ws.terminate()
        }
        ws.isAlive = false
        ws.ping(() => {
          //
        })
      })
  }, 3000)
  }

}
