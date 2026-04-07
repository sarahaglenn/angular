import { EventEmitter, Injectable } from '@angular/core';

import { Device } from './device.model';
import { map, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private devices: Device[] = [];
  deviceListChangedEvent = new Subject<Device[]>();
  deviceSelectedEvent = new EventEmitter<Device>();

  constructor(private http: HttpClient) {}

  getDevices() {
    return this.http
      .get<{
        devices: Device[];
      }>('http://localhost:3000/api/devices')
      .pipe(
        map((response) => {
          this.devices = response.devices || [];
          this.sortAndSend();
          return this.devices;
        }),
      );
  }

  getDevice(id: string): Device {
    return this.devices.find((device: Device) => device.id === id) || null;
  }

  deleteDevice(device: Device) {
    if (!device) {
      return;
    }
    const pos = this.devices.findIndex((c) => c.id === device.id);
    if (pos < 0) {
      return;
    }
    this.http
      .delete('http://localhost:3000/api/devices/' + device.id)
      .subscribe((response: any) => {
        this.devices.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addDevice(newDevice: Device) {
    if (!newDevice) return;
    newDevice.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{
        device: Device;
      }>('http://localhost:3000/api/devices', newDevice, { headers: headers })
      .subscribe((responseData) => {
        this.devices.push(responseData.device);
        this.sortAndSend();
      });
  }

  updateDevice(originalDevice: Device, newDevice: Device) {
    if (!originalDevice || !newDevice) return;

    const pos = this.devices.findIndex((c) => c.id === originalDevice.id);
    if (pos < 0) return;

    newDevice.id = originalDevice.id;
    newDevice._id = originalDevice._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/api/devices/' + originalDevice.id, newDevice, {
        headers: headers,
      })
      .subscribe((response: any) => {
        this.devices[pos] = newDevice;
        this.sortAndSend();
        this.deviceSelectedEvent.emit(newDevice);
      });
  }

  sortAndSend() {
    this.devices.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    );

    this.deviceListChangedEvent.next(this.devices.slice());
  }
}
