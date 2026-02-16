import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './contacts';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id:string): Contact {
    return this.contacts.find(
      (contact: Contact) => contact.id === id
    ) || null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
