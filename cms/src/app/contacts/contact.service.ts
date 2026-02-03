import { Injectable } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id:string): Contact {
    this.contacts.forEach((contact: Contact) => {
      if (contact.id === id)
      {
        return contact
      }
    })
    return null
  }
}
