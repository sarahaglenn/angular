import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DevicesComponent } from './devices/devices.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TechniciansComponent } from './technicians/technicians.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TechnicianDetailComponent } from './technicians/technician-detail/technician-detail.component';
import { TechnicianListComponent } from './technicians/technician-list/technician-list.component';
import { DeviceEditComponent } from './devices/device-edit/device-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  {
    path: 'tickets',
    component: TicketsComponent,
    children: [
      { path: ':id', component: DeviceDetailComponent }
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
      { path: ':id', component: TechnicianDetailComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
