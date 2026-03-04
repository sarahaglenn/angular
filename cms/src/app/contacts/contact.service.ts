import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<
        Contact[]
      >('https://contact-manag-sys-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts || [];

          this.maxContactId = this.getMaxId();

          this.contacts.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error.message);
        },
      );
  }

  storeContacts() {
    this.http
      .put(
        'https://contact-manag-sys-default-rtdb.firebaseio.com/contacts.json',
        this.contacts,
      )
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact: Contact) => contact.id === id) || null;
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
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact) => {
      if (parseInt(contact.id) > maxId) {
        maxId = parseInt(contact.id);
      }
    });
    return maxId;
  }
}
