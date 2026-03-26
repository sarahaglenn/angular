import { Pipe, PipeTransform } from '@angular/core';
import { Device } from './device.model';

@Pipe({
  name: 'devicesFilter',
})
export class DevicesFilterPipe implements PipeTransform {
  transform(devices: Device[], term: string): Device[] {
    if (!term || term.length === 0) {
      return devices;
    }
    const filteredDevices = devices.filter((device: Device) => {
      return device.name.toLowerCase().includes(term.toLowerCase());
    });
    return filteredDevices.length > 0 ? filteredDevices : [];
  }
}
