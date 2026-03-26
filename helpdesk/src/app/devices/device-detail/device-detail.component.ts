import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceStatus } from '../device-status';
import { Device } from '../device.model';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { DeviceService } from '../device.service';

@Component({
  selector: 'hds-device-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent implements OnInit{
  DeviceStatus = DeviceStatus;
  device: Device;
  id: string;

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.device = this.deviceService.getDevice(this.id);
    });
    this.deviceService.deviceListChangedEvent.subscribe(
      (devices: Device[]) => {
        this.device = this.deviceService.getDevice(this.id);
      }
    )
  }

  onDelete() {
    if (this.device) {
      this.deviceService.deleteDevice(this.device);
      this.router.navigate(['/devices']);
    }
  }
}
