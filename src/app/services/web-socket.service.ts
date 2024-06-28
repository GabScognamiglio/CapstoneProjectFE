import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client!: Client;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/gs-guide-websocket';
    const socket = new SockJS(serverUrl);
    this.client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(new Date(), str);
      }
    });

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.client.subscribe('/topic/greetings', (message) => {
        if (message.body) {
          this.messageSubject.next(JSON.parse(message.body));
        }
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  sendMessage(message: string) {
    this.client.publish({
      destination: '/app/hello',
      body: JSON.stringify({ name: message })
    });
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
