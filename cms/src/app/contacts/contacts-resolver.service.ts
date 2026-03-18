import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Contact } from "./contact.model";
import { ContactService } from "./contact.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ContactsResolverService implements Resolve<Contact[]> {
  constructor(private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> | any {
    return this.contactService.getContacts();
  }
}
