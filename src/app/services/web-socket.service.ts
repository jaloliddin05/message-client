import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor(private readonly cookieService: CookieService) {
    const userId = this.cookieService.get('userId');
    this.socket = io(environment.apiUrl, {
      transports: ['websocket', 'polling'],
      reconnection: false,
      withCredentials: true,
      query: { userId },
    });
  }

  sendMessage(id: string) {
    this.socket.emit('send-message', id);
  }

  updateInComingCount(id: string) {
    this.socket.emit('update-incoming-count', id);
  }

  getInComingMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('in-box', (data) => {
        observer.next(data);
      });
    });
  }

  getSendingMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('sending-message', (data) => {
        observer.next(data);
      });
    });
  }

  getInComingCount(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('in-box-count', (data) => {
        observer.next(data);
      });
    });
  }
}
