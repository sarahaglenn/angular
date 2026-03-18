import { Component, OnDestroy, OnInit } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService,
              private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.subscription = this.messageService.messageChangedEvent
    .subscribe(
      (messagesList: Message[]) => {
        this.messages = messagesList;
      }
    );
    this.messageService.getMessages();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
