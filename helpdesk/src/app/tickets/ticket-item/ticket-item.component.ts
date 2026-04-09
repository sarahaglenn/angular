import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from '../../devices/device.service';
import { Ticket } from '../ticket.model';
import { Device } from '../../devices/device.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hds-ticket-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-item.component.html',
  styleUrl: './ticket-item.component.css',
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: Ticket;
  deviceName: string;
  devices: Device[];

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    // const device: Device = this.deviceService.getDevice(
    //   this.ticket.device,
    // )
    // this.deviceName = device.name;
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
}
