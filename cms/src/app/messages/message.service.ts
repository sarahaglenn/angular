import { EventEmitter, Injectable } from '@angular/core';

import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{
        message: String;
        messages: Message[];
      }>('http://localhost:3000/messages')
      .subscribe(
        (response) => {
          this.messages = response.messages || [];
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error.message);
        },
      );
  }

  getMessage(id: string): Message {
    return this.messages.find((message: Message) => message.id === id) || null;
  }

  addMessage(message: Message) {
    if (!message) return;
    message.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{
        message: String;
        newMessage: Message;
      }>('http://localhost:3000/messages', message, { headers: headers })
      .subscribe((responseData) => {
        this.messages.push(responseData.newMessage);
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.messages.sort((a, b) =>
      +a.id > +b.id ? 1 : +b.id > +a.id ? -1 : 0,
    );

    this.messageChangedEvent.next(this.messages.slice());
  }
}
