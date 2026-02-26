import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { FormArray, NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(
          JSON.stringify(this.originalContact.group),
        );
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const newContact = new Contact(
      this.id,
      form.value['name'],
      form.value['email'],
      form.value['phone'],
      form.value['imageUrl'],
      this.groupContacts,
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
      this.onCancel();
    } else {
      this.contactService.addContact(newContact);
      this.router.navigate(['../', newContact.id], { relativeTo: this.route});
    }
  }

  onRemoveItem(index: number) {
    this.groupContacts.splice(index, 1);
  }

  canAcceptContact = (drag: any, drop: any) => {
    if (!drag?.data) return false;
    return !this.groupContacts.some((c) => c.id === drag.data.id);
  };

  onDrop(event: CdkDragDrop<Contact[]>) {
    const draggedContact = event.item.data;

    if (!draggedContact) return;

    const alreadyInGroup = this.groupContacts.some(
      (c) => c.id === draggedContact.id,
    );

    if (!alreadyInGroup) {
      this.groupContacts.push(draggedContact);
    }
  }
}
