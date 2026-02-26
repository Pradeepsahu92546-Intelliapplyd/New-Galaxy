import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { icons } from '../../../shared/components/sidenav/icons-provider';
import { Loader } from '../../../shared/components/modal/loader/loader';
import { AccountType } from '../../../models/enums/account-type.enum';
import { UserTypeForStandard, UserTypeForEnterprise } from '../../../models/enums/user-type.enum';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzSpinModule,
    Loader,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  @Output() switchToLogin = new EventEmitter<void>(); // Event emitter to switch to login

  loading = signal(false);
  passwordVisibleCreate = false;
  passwordVisibleConfirm = false;
  form: FormGroup;

  // Make enums available to template
  accountTypes = Object.values(AccountType);
  userTypes: string[] = Object.values(UserTypeForStandard);

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private notify: NzNotificationService,
    private iconService: NzIconService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^(\+91)?[6-9]\d{9}$/)],
      ],
      accountType: [AccountType.Standard, Validators.required],
      userType: [UserTypeForStandard.individual, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMismatchValidator.bind(this)]],
      agree: [false, Validators.requiredTrue],
    });
    this.iconService.addIcon(...icons);

    // Listen to accountType changes and update userTypes accordingly
    this.form.get('accountType')?.valueChanges.subscribe((accountType) => {
      this.updateUserTypesForAccount(accountType);
    });
  }

  updateUserTypesForAccount(accountType: string) {
    // if (accountType === 'enterprise' || accountType === AccountType.Enterprise) { // future scope for enterprise account type
    if (accountType === 'enterprise'){
      this.userTypes = Object.values(UserTypeForEnterprise);
      this.form.get('userType')?.setValue(Object.values(UserTypeForEnterprise)[0]);
    } else {
      this.userTypes = Object.values(UserTypeForStandard);
      this.form.get('userType')?.setValue(Object.values(UserTypeForStandard)[0]);
    }
  }

   ngOnInit(): void {
  }

passwordMismatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control.parent as FormGroup;
    if (!formGroup) return null;
    
    const password = formGroup.get('password')?.value;
    const confirmPassword = control.value;
    
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordCreate() {
    this.passwordVisibleCreate = !this.passwordVisibleCreate;
  }
  togglePasswordConfirm() {
    this.passwordVisibleConfirm = !this.passwordVisibleConfirm;
  }

  onSubmit() {
    if (
      this.form.invalid ||
      this.form.value.password !== this.form.value.confirmPassword
    ) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { confirmPassword, ...data } = this.form.value;

    this.auth.register(data).subscribe({
      next: (response) => {
        if (response.status === 201) {
          setTimeout(() => {
            this.loading.set(false);
            this.notify.success(
              'Success',
              response.message
            );

            // Pass the email to the verify-email component
            this.router.navigate(['/auth/verify-email'], {
              queryParams: { email: data.email },
            });
          }, 1500);
        } else {
          this.loading.set(false);
          this.notify.success('Success', 'Registration completed');
        }
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 400) {
          this.notify.error(
            'Registration Failed',
            err.error?.message || 'Invalid registration data'
          );
        } else if (err.status === 409) {
          this.notify.error('Registration Failed', 'Email already exists');
        } else if (err.status === 500) {
          this.notify.error('Server Error', 'Please try again later');
        } else {
          this.notify.error(
            'Registration Failed',
            err?.message || 'An unexpected error occurred'
          );
        }
      },
    });
  }
}
