import { DeviceStatus } from "./device-status";

export class Device {
  constructor(
    public id: string,
    public name: string,
    public status: DeviceStatus,
    public lastMaintained?: Date,
    public _id?: string,
  ) {}
}
