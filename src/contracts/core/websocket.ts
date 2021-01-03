import WebSocket from 'ws'

export interface NativeWebSocket extends WebSocket {
  id: string
  isAlive: boolean
}
