import { Component } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { icons } from '../../../shared/icons-provider';
import { DeviceInf } from '../../../models/interfaces/user-management.interface';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login-devices',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzButtonModule],
  templateUrl: './login-devices.html',
  styleUrls: ['./login-devices.css']
})
export class LoginDevices {
  devices: DeviceInf[] = [
    { name: 'Samsung Galaxy S30', time: 'India, May 12, 2023 at 2:30 AM', icon: 'mobile' },
    { name: 'Lenovo', time: 'India, May 12, 2023 at 2:30 AM', icon: 'laptop' },
    { name: 'Asus', time: 'India, May 12, 2023 at 2:30 AM', icon: 'laptop' },
  ];

  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(...icons);
  }

  logoutDevice(device: DeviceInf) {
    this.devices = this.devices.filter(d => d !== device);
    console.log('Logged out device:', device.name);
  }

  logoutAll() {
    this.devices = [];
    console.log('Logged out from all devices');
  }
}
