import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { icons } from '../../../shared/icons-provider';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    NzIconModule,
    NzCardModule,
    NzTypographyModule
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  passwordForm!: FormGroup;
  passwordVisible1 = false;
  passwordVisible2 = false;
  passwordVisible3 = false;

  constructor(private fb: FormBuilder, private iconService: NzIconService,private notification: NzNotificationService) {
    this.iconService.addIcon(...icons);
    this.initForm();
  }

  initForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]
        ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/) // strong password
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, { validators: this.matchPasswords });
  }

  // Custom validator: confirmPassword === newPassword
  matchPasswords(group: AbstractControl): ValidationErrors | null {
    const newPass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return newPass && confirmPass && newPass !== confirmPass ? { passwordMismatch: true } : null;
  }

  changePassword() {
    if (this.passwordForm.valid) {
      console.log('Change password:', this.passwordForm.value);
      this.createNotification('success')
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
  createNotification(type: string): void {
    this.notification.create(
      type,
      'Password Changed Successfully',
      'Your password has changed'
    );
  }
}
