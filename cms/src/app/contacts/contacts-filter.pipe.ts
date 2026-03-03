import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false,
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    if (!term || term.length === 0) {
      return contacts;
    }
    const filteredContacts = contacts.filter((contact: Contact) => {
      return contact.name.toLowerCase().includes(term.toLowerCase());
    });
    return filteredContacts.length > 0 ? filteredContacts : [];
  }
}
