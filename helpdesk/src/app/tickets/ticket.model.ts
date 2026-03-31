import { Device } from '../devices/device.model';
import { Technician } from '../technicians/technician.model';
import { TicketPriority } from './ticket-priority';
import { TicketStatus } from './ticket-status';

export class Ticket {
  constructor(
    public id: string,
    public title: string,
    public device: Device | string,
    public status: TicketStatus = TicketStatus.Open,
    public priority: TicketPriority = TicketPriority.Medium,
    public reportedBy: string,
    public assignedTechnician?: Technician | string,
    public _id?: string,
    public createdAt?: Date,
  ) {}
}
