import { Component, OnInit } from '@angular/core';
import { Device } from '../device.model';
import { DeviceService } from '../device.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { DeviceStatus } from '../device-status';

@Component({
  selector: 'hds-device-edit',
  imports: [ReactiveFormsModule, CommonModule, KeyValuePipe],
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.css',
})
export class DeviceEditComponent implements OnInit {
  deviceForm: FormGroup;
  originalDevice: Device;
  editMode: boolean = false;
  id: string;
  statusValues = DeviceStatus;

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      lastMaintained: [
        '',
        [Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;

      if (!this.editMode) {
        return;
      }
      this.originalDevice = this.deviceService.getDevice(this.id);

      if (this.originalDevice) {
        this.deviceForm.patchValue({
          name: this.originalDevice.name,
          status: this.originalDevice.status,
          lastMaintained: new Date (this.originalDevice.lastMaintained)
            .toISOString()
            .split('T')[0],
        });
      }
    });
  }

  onCancel() {
    this.deviceForm.reset();
  }

  onSubmit() {
    if (this.deviceForm.invalid) return;

    const formValues = this.deviceForm.value;

    const newDevice = new Device(
      this.id,
      formValues.name,
      formValues.status,
      formValues.lastMaintained,
    );
    if (this.editMode) {
      this.deviceService.updateDevice(this.originalDevice, newDevice);
    } else {
      this.deviceService.addDevice(newDevice);
    }
    this.onCancel();
    this.router.navigate(['/devices']);
  }
}
