import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketItemComponent } from "../ticket-item/ticket-item.component";
import { Ticket } from '../ticket.model';
import { Subscription } from 'rxjs';
import { TicketService } from '../ticket.service';
import { DeviceService } from '../../devices/device.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hds-ticket-list',
  imports: [TicketItemComponent, RouterModule, CommonModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit, OnDestroy{
  tickets: Ticket[] = [];
  changeSubscription: Subscription;
  subscription: Subscription;

  constructor(
    private ticketService: TicketService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.changeSubscription = this.ticketService.ticketChangedEvent.subscribe(
      (ticketsList: Ticket[]) => {
        this.tickets = ticketsList;
      },
    );
    this.subscription = this.ticketService.getTickets().subscribe();
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

}
