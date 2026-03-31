import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceService } from '../../devices/device.service';
import { Device } from '../../devices/device.model';
import { DatePipe } from '@angular/common';
import { TicketPriority } from '../ticket-priority';
import { TicketStatus } from '../ticket-status';

@Component({
  selector: 'hds-ticket-edit',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './ticket-edit.component.html',
  styleUrl: './ticket-edit.component.css',
})
export class TicketEditComponent implements OnInit {
  today: Date = new Date();
  devices: Device[] = [];
  submittedBy: string = 'Sarah Glenn';
  id: string = '';
  priorityLevels = TicketPriority;
  statusValues = TicketStatus;
  ticketForm: FormGroup;
  editMode: false;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private deviceService: DeviceService,
  ) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data: Device[]) => {
      this.devices = data;
    });
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      device: ['', Validators.required],
      priority: [TicketPriority.Medium],
      status: [TicketStatus.Open],
    });
  }

  onSubmit() {
    if (this.ticketForm.invalid) return;

    const formValues = this.ticketForm.value;

    const newTicket = new Ticket(
      this.id,
      formValues.title,
      formValues.device,
      formValues.status,
      formValues.priority,
      this.submittedBy,
      null,
      null,
      new Date(),
    );

    this.ticketService.addTicket(newTicket);
    this.onClear();
  }

  onClear() {
    this.ticketForm.reset({ status: TicketStatus.Open });
  }
}
