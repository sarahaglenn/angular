import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeviceService } from '../../devices/device.service';
import { Device } from '../../devices/device.model';
import { CommonModule, DatePipe, KeyValuePipe } from '@angular/common';
import { TicketPriority } from '../ticket-priority';
import { TicketStatus } from '../ticket-status';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Technician } from '../../technicians/technician.model';
import { TechnicianService } from '../../technicians/technician.service';

@Component({
  selector: 'hds-ticket-edit',
  imports: [ReactiveFormsModule, DatePipe, CommonModule],
  templateUrl: './ticket-edit.component.html',
  styleUrl: './ticket-edit.component.css',
})
export class TicketEditComponent implements OnInit {
  ticketForm: FormGroup;
  id: string = '';
  editMode: boolean = false;
  originalTicket: Ticket;
  devices: Device[] = [];
  technicians: Technician[] = [];

  today: Date = new Date();
  orderedPriorities = [
    TicketPriority.High,
    TicketPriority.Medium,
    TicketPriority.Low,
  ];
  orderedStatuses = [
    TicketStatus.Open,
    TicketStatus.InProgress,
    TicketStatus.Resolved,
    TicketStatus.Closed,
  ];
  submittedBy: string = 'Sarah Glenn';

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private deviceService: DeviceService,
    private techService: TechnicianService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      device: ['', Validators.required],
      issueDescription: ['', Validators.required],
      priority: [TicketPriority.Medium],
      assignedTechnician: [''],
      status: [TicketStatus.Open],
    });
  }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data: Device[]) => {
      this.devices = data;
    });
    this.techService.getTechnicians().subscribe((data: Technician[]) => {
      this.technicians = data;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;

      if (!this.editMode) {
        return;
      }
      this.originalTicket = this.ticketService.getTicket(this.id);

      if (this.originalTicket) {
        this.today = new Date(this.originalTicket.createdAt);

        this.ticketForm.patchValue({
          title: this.originalTicket.title,
          device:
            typeof this.originalTicket.device === 'object'
              ? this.originalTicket.device?._id
              : this.originalTicket.device,

          issueDescription: this.originalTicket.issueDescription,
          priority: this.originalTicket.priority,

          assignedTechnician:
            typeof this.originalTicket.assignedTechnician === 'object'
              ? this.originalTicket.assignedTechnician?._id
              : this.originalTicket.assignedTechnician || '',
          status: this.originalTicket.status,
        });
      } else {
        this.today = new Date();
      }
    });
  }

  onSubmit() {
    if (this.ticketForm.invalid) return;

    const formValues = this.ticketForm.value;

    const newTicket = new Ticket(
      this.editMode ? this.id : '',
      formValues.title,
      formValues.device,
      formValues.issueDescription,
      formValues.status,
      formValues.priority,
      this.submittedBy,
      formValues.assignedTechnician,
      this.editMode ? this.originalTicket._id : undefined,
      this.editMode ? this.originalTicket.createdAt : new Date(),
    );

    if (this.editMode) {
      this.ticketService.updateTicket(this.originalTicket, newTicket);
    } else {
      this.ticketService.addTicket(newTicket);
    }
    this.onClear();
    this.router.navigate(['/tickets']);
  }

  onClear() {
    this.ticketForm.reset({
      status: TicketStatus.Open,
      priority: TicketPriority.Medium,
    });
  }
}
