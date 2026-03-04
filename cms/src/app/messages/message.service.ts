import { EventEmitter, Injectable } from '@angular/core';

import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) { }

  getMessages() {
    this.http
    .get<Message[]>('https://contact-manag-sys-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error.message)
      }
    )
  }

  storeMessages() {
    this.http
    .put('https://contact-manag-sys-default-rtdb.firebaseio.com/messages.json',
      this.messages
    )
    .subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    })
  }

  getMessage(id: string): Message {
    return this.messages.find((message: Message) => message.id === id) || null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      if (parseInt(message.id) > maxId) {
        maxId = parseInt(message.id);
      }
    });
    return maxId;
  }
}
