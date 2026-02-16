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
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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

  addContact( newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateContact( originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0 ) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice())
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach( (contact) => {
      if (parseInt(contact.id) > maxId) {
        maxId = parseInt(contact.id);
      }
    })
    return maxId;
  }
}
