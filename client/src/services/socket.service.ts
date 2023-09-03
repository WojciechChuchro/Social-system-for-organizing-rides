import {Injectable} from '@angular/core'
import {io, Socket} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket

  constructor() {
    this.socket = io('http://localhost:8080', {withCredentials: true})
  }

  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data)
  }

  listenForEvent(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback)
  }
}
