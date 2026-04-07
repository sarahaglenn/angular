import { Device } from '../devices/device.model';
import { Technician } from '../technicians/technician.model';
import { TicketPriority } from './ticket-priority';
import { TicketStatus } from './ticket-status';

export class Ticket {
  constructor(
    public id: string,
    public title: string,
    public device: Device,
    public issueDescription: string,
    public status: TicketStatus,
    public priority: TicketPriority,
    public reportedBy: string,
    public assignedTechnician?: Technician,
    public _id?: string,
    public createdAt?: Date,
  ) {}
}
