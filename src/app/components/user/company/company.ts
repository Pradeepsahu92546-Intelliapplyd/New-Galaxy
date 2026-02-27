import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { icons } from '../../../shared/icons-provider';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzEmptyModule
  ],
  templateUrl: './company.html',
  styleUrls: ['./company.css']
})
export class Company {
  companyForm!: FormGroup;

  showForm = false;
  isEditMode = true; // true → editable, false → readonly

  constructor(private fb: FormBuilder, private iconService: NzIconService) {
    this.initForm();
    this.iconService.addIcon(...icons);
  }

  initForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      gst: ['', [Validators.required, Validators.pattern(/^[0-9A-Z]{10}$/)]], // 15-char GST
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      website: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*$/)
        ]
      ]
    });
  }

  get f() {
    return this.companyForm.controls;
  }

  addCompany() {
    this.showForm = true;
    this.isEditMode = true;
    this.initForm();
  }

  saveCompany() {
    if (this.companyForm.valid) {
      this.companyForm.disable(); // disable inputs for readonly
      this.isEditMode = false;
      this.showForm = true;
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  editCompany() {
    this.companyForm.enable(); // enable inputs for editing
    this.isEditMode = true;
  }

  cancelForm() {
    if (this.companyForm.disabled) {
      // already saved company, return to view mode
      this.showForm = true;
      this.isEditMode = false;
    } else {
      // nothing saved yet, hide the form
      this.showForm = false;
    }
  }
}
