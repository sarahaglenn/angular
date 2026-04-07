import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DevicesComponent } from './devices/devices.component';
import { TechniciansComponent } from './technicians/technicians.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { TechnicianDetailComponent } from './technicians/technician-detail/technician-detail.component';
import { DeviceEditComponent } from './devices/device-edit/device-edit.component';
import { TechnicianEditComponent } from './technicians/technician-edit/technician-edit.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  {
    path: 'tickets',
    component: TicketsComponent,
    children: [
      { path: 'new', component: TicketEditComponent},
      { path: ':id', component: TicketDetailComponent },
      { path: ':id/edit', component: TicketEditComponent}
    ],
  },
  {
    path: 'devices',
    component: DevicesComponent,
    children: [
      { path: 'new', component: DeviceEditComponent},
      { path: ':id', component: DeviceDetailComponent},
      { path: ':id/edit', component: DeviceEditComponent}
    ]
  },
  {
    path: 'technicians',
    component: TechniciansComponent,
    children: [
      { path: 'new', component: TechnicianEditComponent},
      { path: ':id', component: TechnicianDetailComponent },
      { path: ':id/edit', component: TechnicianEditComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
