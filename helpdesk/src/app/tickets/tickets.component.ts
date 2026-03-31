import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';

@Component({
  selector: 'hds-tickets',
  imports: [TicketListComponent, RouterOutlet],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit{
  selectedTicket: Ticket;

  constructor(
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketService.ticketSelectedEvent
      .subscribe(
        (ticket: Ticket) => {
          this.selectedTicket = ticket;
        }
      );
  }

}
