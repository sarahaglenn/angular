import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'hds-ticket-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css',
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket;
  id: string;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.ticket = this.ticketService.getTicket(this.id);
      if (!this.ticket) {
        this.ticketService.getTickets().subscribe();
      }
    });
    this.ticketService.ticketChangedEvent.subscribe((tickets: Ticket[]) => {
      this.ticket = this.ticketService.getTicket(this.id);
    });
  }

  onDelete() {
    if (this.ticket) {
      this.ticketService.deleteTicket(this.ticket);
      this.router.navigate(['/tickets']);
    }
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'Open':
        return 'status-open';
      case 'In Progress':
        return 'status-progress';
      case 'Resolved':
        return 'status-resolved';
      case 'Closed':
        return 'status-closed';
      default:
        return 'bg-light';
    }
  }

  getPriorityClass(priority: string | undefined): string {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return 'bg-light';
    }
  }
}
