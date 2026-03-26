import { Component, OnInit } from '@angular/core';
import { Device } from '../device.model';
import { DeviceService } from '../device.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hds-device-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.css'
})
export class DeviceEditComponent implements OnInit {
  originalDevice: Device;
  device: Device;
  editMode: boolean = false;
  id: string;

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.originalDevice = this.deviceService.getDevice(this.id);
      if (!this.originalDevice) {
        return;
      }
      this.editMode = true;
      this.device = JSON.parse(JSON.stringify(this.originalDevice));
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const newDevice = new Device(
      this.id,
      form.value['name'],
      form.value['status'],
      form.value['lastMaintained']
    );
    if (this.editMode) {
      this.deviceService.updateDevice(this.originalDevice, newDevice);
    } else {
      this.deviceService.addDevice(newDevice);
      this.router.navigate(['../', newDevice.id], {relativeTo: this.route});
    }
    this.onCancel();
  }
}
