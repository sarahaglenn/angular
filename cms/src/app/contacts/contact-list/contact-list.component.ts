import { Component, OnDestroy, OnInit} from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit, OnDestroy{
  contacts: Contact[] = [];
  subscription: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
