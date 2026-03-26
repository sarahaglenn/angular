import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Technician } from '../technician.model';
import { TechnicianService } from '../technician.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'hds-technician-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './technician-edit.component.html',
  styleUrl: './technician-edit.component.css'
})
export class TechnicianEditComponent implements OnInit {
  originalTech: Technician;
  technician: Technician;
  editMode: boolean = false;
  id: string;

  constructor(
    private techService: TechnicianService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.originalTech = this.techService.getTechnician(this.id);
      if (!this.originalTech) {
        return;
      }
      this.editMode = true;
      this.technician = JSON.parse(JSON.stringify(this.originalTech));
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    const newTech = new Technician(
      this.id,
      form.value['name'],
      form.value['email'],
      form.value['phone'],
      form.value['imageUrl']
    );
    if (this.editMode) {
      this.techService.updateTechnician(this.originalTech, newTech);
    } else {
      this.techService.addTechnician(newTech);
      this.router.navigate(['../', newTech.id], {relativeTo: this.route});
    }
    this.onCancel();
  }
}
