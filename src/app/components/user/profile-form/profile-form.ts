import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { icons } from '../../../shared/icons-provider';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-profileform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzIconModule,
  ],
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.css']
})

export class ProfileForm implements OnInit {
  profileForm!: FormGroup;
  
  // Separate edit modes
  isEditingBasic = false;
  isEditingPhone = false;
  
  // Loading states
  isSavingBasic = false;
  isSavingPhone = false;

  constructor(
    private fb: FormBuilder, 
    private iconService: NzIconService,
    private userService: UserService
  ) {
    this.iconService.addIcon(...icons);
    this.initForm();
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(4)]],
      lastName: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(4)]],
      dob: [{ value: null, disabled: true }, [Validators.required]],
      phone: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{8,12}$/)]],
      countryCode: [{ value: '+91', disabled: true }, [Validators.required]],
    });
  }

  loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        const userData = response.data;
        this.profileForm.patchValue({
          firstName: userData.fname,
          lastName: userData.lname,
          dob: userData.dob,
          phone: userData.phone,
          countryCode: '+91'
        });
        console.log('Profile loaded successfully');
      },
      error: (err) => console.error('Error fetching profile', err)
    });
  }

  // Basic Info Methods
  enableBasicEdit(): void {
    this.isEditingBasic = true;
    this.profileForm.get('firstName')?.enable();
    this.profileForm.get('lastName')?.enable();
    this.profileForm.get('dob')?.enable();
  }

  cancelBasicEdit(): void {
    this.isEditingBasic = false;
    this.profileForm.get('firstName')?.disable();
    this.profileForm.get('lastName')?.disable();
    this.profileForm.get('dob')?.disable();
    // Reload original data
    this.loadUserProfile();
  }

  saveBasicInfo(): void {
    if (this.profileForm.get('firstName')?.invalid || 
        this.profileForm.get('lastName')?.invalid || 
        this.profileForm.get('dob')?.invalid) {
      this.profileForm.get('firstName')?.markAsTouched();
      this.profileForm.get('lastName')?.markAsTouched();
      this.profileForm.get('dob')?.markAsTouched();
      return;
    }

    this.isSavingBasic = true;
    
    const basicData = {
      fname: this.profileForm.get('firstName')?.value,
      lname: this.profileForm.get('lastName')?.value,
      dob: this.profileForm.get('dob')?.value
    };

    this.userService.updateProfileBasic(basicData).subscribe({
      next: (response) => {
        this.isSavingBasic = false;
        this.isEditingBasic = false;
        
        // Disable basic info fields
        this.profileForm.get('firstName')?.disable();
        this.profileForm.get('lastName')?.disable();
        this.profileForm.get('dob')?.disable();
        
        // Show success message (you can add a toast/notification here)
        console.log('Basic info updated successfully');
      },
      error: (err) => {
        this.isSavingBasic = false;
        console.error('Error updating basic info', err);
        // Show error message
      }
    });
  }

  // Phone Methods
  enablePhoneEdit(): void {
    this.isEditingPhone = true;
    this.profileForm.get('phone')?.enable();
    this.profileForm.get('countryCode')?.enable();
  }

  cancelPhoneEdit(): void {
    this.isEditingPhone = false;
    this.profileForm.get('phone')?.disable();
    this.profileForm.get('countryCode')?.disable();
    // Reload original data
    this.loadUserProfile();
  }

  savePhoneInfo(): void {
    if (this.profileForm.get('phone')?.invalid) {
      this.profileForm.get('phone')?.markAsTouched();
      return;
    }

    this.isSavingPhone = true;
    
    const phoneData = {
      phone: this.profileForm.get('phone')?.value,
      countryCode: this.profileForm.get('countryCode')?.value
    };

    this.userService.updateProfilePhone(phoneData).subscribe({
      next: (response) => {
        this.isSavingPhone = false;
        this.isEditingPhone = false;
        
        // Disable phone fields
        this.profileForm.get('phone')?.disable();
        this.profileForm.get('countryCode')?.disable();
        
        // Show success message
        console.log('Phone info updated successfully');
      },
      error: (err) => {
        this.isSavingPhone = false;
        console.error('Error updating phone info', err);
        // Show error message
      }
    });
  }

  // Helper getter for form controls
  get f() {
    return this.profileForm.controls;
  }
}