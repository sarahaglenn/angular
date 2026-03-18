import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from './contact.model';
import { map, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<{message: String, contacts: Contact[]}>('http://localhost:3000/contacts')
      .pipe(
        map(response => {
          this.contacts = response.contacts || [];
          this.sortAndSend();
          return this.contacts;
        })
      );
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact: Contact) => contact.id === id) || null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex((c) => c.id === contact.id);
    if (pos < 0) {
      return;
    }
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: any) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{
        message: String;
        contact: Contact;
      }>('http://localhost:3000/contacts', newContact, { headers: headers })
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id,
        newContact, { headers: headers })
      .subscribe((response: any) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
        this.contactSelectedEvent.emit(newContact);
      });
  }

  sortAndSend() {
    this.contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    );

    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
