import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Device } from './device.model';
import { DeviceService } from './device.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DevicesResolverService implements Resolve<Device[]> {
  constructor(private deviceService: DeviceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Device[]> | any {
    return this.deviceService.getDevices();
  }
}
