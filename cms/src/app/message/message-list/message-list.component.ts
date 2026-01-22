import { Component } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [
    {
      id: 2,
      subject: 'Office Hours?',
      msgText:
        'Hey Sister Smith, I need some help with assignment 3. Are you holding office hours today?',
      sender: 'Jill Fisher',
    },
    {
      id: 3,
      subject: 'Project',
      msgText: 'Hi Emma, I got your project. Nice work!',
      sender: 'Bro. Jackson',
    },
    { id: 4, subject: 'Thank you', msgText: 'Thank you for the feedback on my last assignment. I really struggled with that one, and your notes made things a lot clearer.', sender: 'Kate Harper' },
    { id: 5, subject: 'Sick today', msgText: 'Hi Sister Smith. I wanted to let you know that I want be in class today. I have the stomach flu, so I am home resting. I hope to be back next week. Please send the notes from this week. Thanks, Mark', sender: 'Mark Erikson' },
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
