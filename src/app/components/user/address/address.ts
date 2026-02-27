import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { icons } from '../../../shared/icons-provider';
import { AddressInf } from '../../../models/interfaces/user-management.interface';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTagModule,
    NzEmptyModule,
    NzIconModule
  ],
  templateUrl: './address.html',
  styleUrl: './address.css'
})
export class Address {
  addresses: AddressInf[] = [];
  showForm = false;
  addressForm!: FormGroup;
  editingIndex: number | null = null;

  constructor(private iconService: NzIconService, private fb: FormBuilder) {
    this.initForm();
    this.iconService.addIcon(...icons);
  }

  initForm() {
    this.addressForm = this.fb.group({
      address1: ['', Validators.required],
      address2: ['',Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]], // simple pin/zip validation
      type: ['Office'],
      isDefault: [false]
    });
  }

  addAddress() {
    this.showForm = true;
    this.editingIndex = null;
    this.initForm();
  }

  editAddress(index: number) {
    this.showForm = true;
    this.editingIndex = index;
    this.addressForm.patchValue(this.addresses[index]);
  }

  deleteAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  cancelForm() {
    this.showForm = false;
    this.editingIndex = null;
  }

  saveAddress() {
    if (this.addressForm.valid) {
      const newAddress = this.addressForm.value;
      if (newAddress.isDefault) {
        this.addresses.forEach(addr => (addr.isDefault = false));
      }
      if (this.editingIndex !== null) {
        this.addresses[this.editingIndex] = newAddress;
      } else {
        this.addresses.push(newAddress);
      }
      this.showForm = false;
      this.editingIndex = null;
    } else {
      this.addressForm.markAllAsTouched(); // show errors if form submitted
    }
  }
}
