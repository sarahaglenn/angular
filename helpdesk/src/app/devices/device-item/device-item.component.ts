import { Component, Input } from '@angular/core';
import { Device } from '../device.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hds-device-item',
  imports: [RouterModule],
  templateUrl: './device-item.component.html',
  styleUrl: './device-item.component.css'
})
export class DeviceItemComponent {
  @Input() device: Device;
}
