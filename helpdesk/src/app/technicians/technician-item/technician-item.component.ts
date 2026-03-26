import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Technician } from '../technician.model';

@Component({
  selector: 'hds-technician-item',
  imports: [RouterModule],
  templateUrl: './technician-item.component.html',
  styleUrl: './technician-item.component.css'
})
export class TechnicianItemComponent {
  @Input() technician: Technician;
}
