import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Technician } from '../technician.model';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'hds-technician-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './technician-detail.component.html',
  styleUrl: './technician-detail.component.css'
})
export class TechnicianDetailComponent implements OnInit {
  technician: Technician;
  id: string;

  constructor(
    private techService: TechnicianService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.technician = this.techService.getTechnician(this.id);
    });
    this.techService.technicianListChangedEvent.subscribe(
      (technicians: Technician[]) => {
        this.technician = this.techService.getTechnician(this.id);
      }
    )
  }

  onDelete() {
    if (this.technician) {
      this.techService.deleteTechnician(this.technician);
      this.router.navigate(['/technicians']);
    }
  }
}
