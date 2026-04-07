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
      }>('http://localhost:3000/api/tickets')
      .pipe(
        map(
          (response) => {
            this.tickets = response.tickets || [];
            this.sortAndSend();
            return this.tickets;
          },
          (error: any) => {
            console.log(error.ticket);
          },
        ),
      );
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
      }>('http://localhost:3000/api/tickets', ticket, { headers: headers })
      .subscribe((responseData) => {
        this.tickets.push(responseData.newTicket);
        this.sortAndSend();
      });
  }

  updateTicket(originalTicket: Ticket, newTicket: Ticket) {
    if (!originalTicket || !newTicket) return;

    const pos = this.tickets.findIndex((t) => t.id === originalTicket.id);
    if (pos < 0) return;

    newTicket.id = originalTicket.id;
    newTicket._id = originalTicket._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'http://localhost:3000/api/tickets/' + originalTicket.id,
        newTicket,
        {
          headers: headers,
        },
      )
      .subscribe((response: any) => {
        this.tickets[pos] = response.ticket;
        this.sortAndSend();
        this.ticketSelectedEvent.emit(response.ticket);
      });
  }





  deleteTicket(ticket: Ticket) {
    if (!ticket) {
      return;
    }
    const pos = this.tickets.findIndex((t) => t.id === ticket.id);
    if (pos < 0) {
      return;
    }
    this.http
      .delete('http://localhost:3000/api/tickets/' + ticket.id)
      .subscribe((response: any) => {
        this.tickets.splice(pos, 1);
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.tickets.sort((a, b) => {

      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return dateA - dateB;
    });

    this.ticketChangedEvent.next(this.tickets.slice());
  }
}
