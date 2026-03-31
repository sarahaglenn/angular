import { EventEmitter, Injectable } from '@angular/core';

import { Ticket } from './ticket.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets: Ticket[] = [];
  ticketChangedEvent = new Subject<Ticket[]>();
  ticketSelectedEvent = new EventEmitter<Ticket>();

  constructor(private http: HttpClient) {}

  getTickets() {
    return this.http
      .get<{
        tickets: Ticket[];
      }>('http://localhost:3000/tickets')
      .pipe(
        map((response) => {
          this.tickets = response.tickets || [];
          this.sortAndSend();
          return this.tickets;
        },
        (error: any) => {
          console.log(error.ticket);
        },
      ));
  }

  getTicket(id: string): Ticket {
    return this.tickets.find((ticket: Ticket) => ticket.id === id) || null;
  }

  addTicket(ticket: Ticket) {
    if (!ticket) return;
    ticket.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{
        newTicket: Ticket;
      }>('http://localhost:3000/tickets', ticket, { headers: headers })
      .subscribe((responseData) => {
        this.tickets.push(responseData.newTicket);
        this.sortAndSend();
      });
  }

  updateTicket(originalTicket: Ticket, newTicket: Ticket) {
    
  }

  sortAndSend() {
    this.tickets.sort((a, b) => (+a.createdAt > +b.createdAt ? 1 : +b.createdAt > +a.createdAt ? -1 : 0));

    this.ticketChangedEvent.next(this.tickets.slice());
  }
}
