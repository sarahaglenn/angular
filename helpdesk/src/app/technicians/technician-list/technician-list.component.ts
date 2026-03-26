import { Component, OnDestroy, OnInit } from '@angular/core';
import { TechnicianItemComponent } from '../technician-item/technician-item.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TechsFilterPipe } from '../tech-filter.pipe';
import { Technician } from '../technician.model';
import { Subscription } from 'rxjs';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'hds-technician-list',
  imports: [RouterModule, CommonModule, TechnicianItemComponent, TechsFilterPipe],
  templateUrl: './technician-list.component.html',
  styleUrl: './technician-list.component.css'
})
export class TechnicianListComponent implements OnInit, OnDestroy{
  technicians: Technician[] = [];
  changeSubscription: Subscription;
  subscription: Subscription;
  term: string;

  constructor( private techService: TechnicianService) {}

  ngOnInit(): void {
    this.changeSubscription = this.techService.technicianListChangedEvent.subscribe(
      (techsList: Technician[]) => {
        this.technicians = techsList;
      },
    );
    this.subscription = this.techService.getTechnicians().subscribe();
  }

  alwaysFalse = () => false;

  search (value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
      this.subscription.unsubscribe();
  }
}
