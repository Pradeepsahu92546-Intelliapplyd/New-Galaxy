import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconService } from 'ng-zorro-antd/icon';

import { Register } from './register';
import { Auth } from '../../../services/auth/auth';
import { Loader } from '../../../shared/components/modal/loader/loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent - UNIT TESTS', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let authService: Auth;
  let router: Router;
  let notificationService: NzNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Register, Loader, HttpClientTestingModule],
      providers: [
        FormBuilder,
        Auth,
        {
          provide: Router,
          useValue: {
            navigateByUrl: jasmine.createSpy('navigateByUrl'),
            navigate: jasmine.createSpy('navigate'),
          },
        },
        {
          provide: NzNotificationService,
          useValue: {
            success: jasmine.createSpy('success'),
            error: jasmine.createSpy('error'),
          },
        },
        {
          provide: NzIconService,
          useValue: {
            addIcon: jasmine.createSpy('addIcon'),
          },
        },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;

    // Get the actual services
    authService = TestBed.inject(Auth);
    router = TestBed.inject(Router);
    notificationService = TestBed.inject(NzNotificationService);

    fixture.detectChanges();
  });

  describe('Component methods and logic', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should define the form', () => {
      expect(component.form).toBeDefined();
    });

    it('should have a required validator for firstName', () => {
      expect(
        component.form.get('firstName')?.hasValidator(Validators.required)
      ).toBeTrue();
    });

    it('should have an email validator for email', () => {
      expect(
        component.form.get('email')?.hasValidator(Validators.email)
      ).toBeTrue();
    });

    it('should initialize accountType with value individual', () => {
      expect(component.form.get('accountType')?.value).toBe('individual');
    });

    it('should initialize userType with value admin', () => {
      expect(component.form.get('userType')?.value).toBe('admin');
    });

    it('should toggle password visibility for create password', () => {
      const initialValue = component.passwordVisibleCreate;
      component.togglePasswordCreate();
      expect(component.passwordVisibleCreate).toBe(!initialValue);
    });

    it('should toggle password visibility for confirm password', () => {
      const initialValue = component.passwordVisibleConfirm;
      component.togglePasswordConfirm();
      expect(component.passwordVisibleConfirm).toBe(!initialValue);
    });

    it('should validate password mismatch correctly with both same password', () => {
      const formGroup = component.form;
      formGroup.get('password')?.setValue('password123');
      formGroup.get('confirmPassword')?.setValue('password123');
      expect(component.passwordMismatchValidator(formGroup)).toBeNull();
    });

    it('should validate password mismatch correctly with both different password', () => {
      const formGroup = component.form;
      formGroup.get('password')?.setValue('password123');
      const confirmPasswordControl = formGroup.get('confirmPassword');
      confirmPasswordControl?.setValue('differentPassword');
      expect(
        component.passwordMismatchValidator(confirmPasswordControl!)
      ).toEqual({ mismatch: true });
    });

    it('should emit switchToLogin event', () => {
      spyOn(component.switchToLogin, 'emit');
      component.switchToLogin.emit();
      expect(component.switchToLogin.emit).toHaveBeenCalled();
    });

    it('should mark form as touched when invalid form is submitted', () => {
      spyOn(component.form, 'markAllAsTouched');
      component.onSubmit();
      expect(component.form.markAllAsTouched).toHaveBeenCalled();
    });

    it('should not call auth service when form is invalid', () => {
      spyOn(authService, 'register');
      component.form.controls['firstName'].setValue('');
      component.onSubmit();
      expect(authService.register).not.toHaveBeenCalled();
    });

    it('should not call auth service when passwords do not match', () => {
      spyOn(authService, 'register');
      component.form.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '9876543210',
        password: 'password123',
        confirmPassword: 'differentpassword',
        agree: true,
      });
      component.onSubmit();
      expect(authService.register).not.toHaveBeenCalled();
    });
  });

  describe('Form validation', () => {
    it('should require firstName field', () => {
      const control = component.form.get('firstName');
      expect(control?.hasValidator(Validators.required)).toBeTrue();
    });

    it('should require lastName field', () => {
      const control = component.form.get('lastName');
      expect(control?.hasValidator(Validators.required)).toBeTrue();
    });

    it('should require email field', () => {
      const control = component.form.get('email');
      expect(control?.hasValidator(Validators.required)).toBeTrue();
    });

    it('should require phone field', () => {
      const control = component.form.get('phone');
      expect(control?.hasValidator(Validators.required)).toBeTrue();
    });

    it('should require password field', () => {
      const control = component.form.get('password');
      expect(control?.hasValidator(Validators.required)).toBeTrue();
    });

    it('should require confirmPassword field', () => {
      const control = component.form.get('confirmPassword');
      expect(control?.hasValidator(Validators.required)).toBeTrue();
    });

    it('should require agree field to be true', () => {
      const control = component.form.get('agree');
      expect(control?.hasValidator(Validators.requiredTrue)).toBeTrue();
    });

    it('should validate password minimum length short value', () => {
      component.form.controls['password'].setValue('short');
      expect(component.form.controls['password'].valid).toBeFalse();
    });

    it('should validate password minimum length long value', () => {
      component.form.controls['password'].setValue('longenoughpassword');
      expect(component.form.controls['password'].valid).toBeTrue();
    });

    it('should validate password confirmation match', () => {
      component.form.controls['password'].setValue('password123');
      component.form.controls['confirmPassword'].setValue('password123');
      expect(component.form.controls['confirmPassword'].valid).toBeTrue();

      component.form.controls['confirmPassword'].setValue('different');
      expect(
        component.form.controls['confirmPassword'].hasError('mismatch')
      ).toBeTrue();
    });

    it('should require agreement to terms in invalid case', () => {
      component.form.controls['agree'].setValue(false);
      expect(component.form.controls['agree'].valid).toBeFalse();
    });

    it('should require agreement to terms in valid case', () => {
      component.form.controls['agree'].setValue(true);
      expect(component.form.controls['agree'].valid).toBeTrue();
    });

    describe('Phone number pattern validation', () => {
      it('should invalidate phone number pattern for 10 digits without starting with 6, 7, 8 or 9', () => {
        component.form.controls['phone'].setValue('1234567890');
        expect(component.form.controls['phone'].valid).toBeFalse();
      });

      it('should invalidate phone number pattern for non-numeric characters', () => {
        component.form.controls['phone'].setValue('abcdefghij');
        expect(component.form.controls['phone'].valid).toBeFalse();
      });

      it('should invalidate phone number pattern for less than 10 digits', () => {
        component.form.controls['phone'].setValue('987654321');
        expect(component.form.controls['phone'].valid).toBeFalse();
      });

      it('should invalidate phone number pattern for more than 10 digits', () => {
        component.form.controls['phone'].setValue('98765432101');
        expect(component.form.controls['phone'].valid).toBeFalse();
      });
    });

    describe('Email format validation', () => {
      it('should validate email format correctly for test@example.com', () => {
        component.form.controls['email'].setValue('test@example.com');
        expect(component.form.controls['email'].valid).toBeTrue();
      });

      it('should validate email format correctly for user.name@domain.co.uk', () => {
        component.form.controls['email'].setValue('user.name@domain.co.uk');
        expect(component.form.controls['email'].valid).toBeTrue();
      });

      it('should validate email format correctly for user+tag@example.org', () => {
        component.form.controls['email'].setValue('user+tag@example.org');
        expect(component.form.controls['email'].valid).toBeTrue();
      });

      it('should validate email format incorrectly for invalid', () => {
        component.form.controls['email'].setValue('invalid');
        expect(component.form.controls['email'].valid).toBeFalse();
      });

      it('should validate email format incorrectly for missing@', () => {
        component.form.controls['email'].setValue('missing@');
        expect(component.form.controls['email'].valid).toBeFalse();
      });

      it('should validate email format incorrectly for @missing.com', () => {
        component.form.controls['email'].setValue('@missing.com');
        expect(component.form.controls['email'].valid).toBeFalse();
      });

      it('should validate email format incorrectly for spaces in@email.com', () => {
        component.form.controls['email'].setValue('spaces in@email.com');
        expect(component.form.controls['email'].valid).toBeFalse();
      });
    });

    it('should require all mandatory fields', () => {
      const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'password',
        'confirmPassword',
      ];
      const requiredTrueFields = ['agree'];

      requiredFields.forEach((field) => {
        const control = component.form.get(field);
        expect(control?.hasValidator(Validators.required)).toBeTrue();
      });

      requiredTrueFields.forEach((field) => {
        const control = component.form.get(field);
        expect(control?.hasValidator(Validators.requiredTrue)).toBeTrue();
      });
    });
  });
});