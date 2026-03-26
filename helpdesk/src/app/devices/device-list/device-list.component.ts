import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceItemComponent } from "../device-item/device-item.component";
import { RouterModule } from '@angular/router';
import { Device } from '../device.model';
import { DeviceService } from '../device.service';
import { DevicesFilterPipe } from '../device-filter.pipe';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hds-device-list',
  imports: [DeviceItemComponent, RouterModule, DevicesFilterPipe, CommonModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit, OnDestroy{
  devices: Device[] = [];
  changeSubscription: Subscription;
  subscription: Subscription;
  term: string;

  constructor( private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.changeSubscription = this.deviceService.deviceListChangedEvent.subscribe(
      (devicesList: Device[]) => {
        this.devices = devicesList;
      },
    );
    this.subscription = this.deviceService.getDevices().subscribe();
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
