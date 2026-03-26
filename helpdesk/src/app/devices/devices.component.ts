import { Component, OnInit } from '@angular/core';
import { DeviceListComponent } from "./device-list/device-list.component";
import { Device } from './device.model';
import { TechnicianService } from '../technicians/technician.service';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from './device.service';

@Component({
  selector: 'hds-devices',
  imports: [DeviceListComponent, RouterOutlet],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit{
  selectedDevice: Device;

  constructor(
    private deviceService: DeviceService ) {}

  ngOnInit(): void {
    this.deviceService.deviceSelectedEvent
      .subscribe(
        (device: Device) => {
          this.selectedDevice = device;
        }
      );
  }

}
