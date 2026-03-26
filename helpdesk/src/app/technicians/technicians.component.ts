import { Component, OnInit } from '@angular/core';
import { TechnicianListComponent } from './technician-list/technician-list.component';
import { RouterOutlet } from '@angular/router';
import { Technician } from './technician.model';
import { TechnicianService } from './technician.service';

@Component({
  selector: 'hds-technicians',
  imports: [RouterOutlet, TechnicianListComponent],
  templateUrl: './technicians.component.html',
  styleUrl: './technicians.component.css'
})
export class TechniciansComponent implements OnInit {
  selectedTech: Technician;

  constructor( private techService: TechnicianService) {}

  ngOnInit(): void {
    this.techService.technicianSelectedEvent
      .subscribe(
        (technician: Technician) => {
          this.selectedTech = technician;
        }
      );
  }
}
