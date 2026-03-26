import { Technician } from "../technicians/technician.model";
import { TicketStatus } from "./ticket-status";

export class Device {
  constructor(
    public id: string,
    public device: Device,
    public status: TicketStatus,
    public assignedTechnician: Technician,
    public dateSubmitted: Date,
    public _id?: string,
  ) {}
}
