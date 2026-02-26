import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconService } from 'ng-zorro-antd/icon';

import { Login } from './login';
import { Auth } from '../../../services/auth/auth';
import { Loader } from '../../../shared/components/modal/loader/loader';
import { InputDialog } from '../../../shared/components/modal/dialog/input-dialog/input-dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent - UNIT TESTS', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: Auth;
  let router: Router;
  let notificationService: NzNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        Login,
        Loader,
        InputDialog,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        Auth,
        {
          provide: Router,
          useValue: {
            navigateByUrl: jasmine.createSpy('navigateByUrl'),
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

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    authService = TestBed.inject(Auth);
    router = TestBed.inject(Router);
    notificationService = TestBed.inject(NzNotificationService);

    fixture.detectChanges();
  });

  describe('Component methods and logic', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have email form control with required validator', () => {
      expect(
        component.form.get('email')?.hasValidator(Validators.required)
      ).toBeTrue();
    });

    it('should have email form control with email validator', () => {
      expect(
        component.form.get('email')?.hasValidator(Validators.email)
      ).toBeTrue();
    });

    it('should have password form control with required validator', () => {
      expect(
        component.form.get('password')?.hasValidator(Validators.required)
      ).toBeTrue();
    });

    it('should have agree form control with requiredTrue validator', () => {
      expect(
        component.form.get('agree')?.hasValidator(Validators.requiredTrue)
      ).toBeTrue();
    });

    it('should toggle password visibility', () => {
      const initialValue = component.passwordVisible();
      component.togglePassword();
      expect(component.passwordVisible()).toBe(!initialValue);
    });

    it('should set submitted to true when onSubmit is called', () => {
      component.onSubmit();
      expect(component.submitted()).toBeTrue();
    });

    it('should not call auth service when form is invalid', () => {
      spyOn(authService, 'login');
      component.onSubmit();
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('should emit switchToRegister event', () => {
      spyOn(component.switchToRegister, 'emit');
      component.switchToRegister.emit();
      expect(component.switchToRegister.emit).toHaveBeenCalled();
    });

    it('should open email dialog', () => {
      component.emailComp = {
        showModal: jasmine.createSpy('showModal'),
      } as any;

      component.openEmailConfirm();
      expect(component.emailComp.showModal).toHaveBeenCalled();
    });
  });

  describe('Form validation', () => {
    it('should require email field', () => {
      const control = component.form.get('email');
      expect(control?.hasValidator(Validators.required)).toBeTrue();
    });

    it('should validate email format correctly for valid email', () => {
      component.form.controls['email'].setValue('test@example.com');
      expect(component.form.controls['email'].valid).toBeTrue();
    });

    it('should validate email format correctly for invalid email', () => {
      component.form.controls['email'].setValue('invalid');
      expect(component.form.controls['email'].valid).toBeFalse();
    });

    it('should require password field', () => {
      const control = component.form.get('password');
      expect(control?.hasValidator(Validators.required)).toBeTrue();
    });

    it('should validate password minimum length for short password', () => {
      component.form.controls['password'].setValue('short');
      expect(component.form.controls['password'].valid).toBeFalse();
    });

    it('should validate password minimum length for long enough password', () => {
      component.form.controls['password'].setValue('longenoughpassword');
      expect(component.form.controls['password'].valid).toBeTrue();
    });

    it('should require agreement to terms for false value', () => {
      component.form.controls['agree'].setValue(false);
      expect(component.form.controls['agree'].valid).toBeFalse();
    });

    it('should require agreement to terms for true value', () => {
      component.form.controls['agree'].setValue(true);
      expect(component.form.controls['agree'].valid).toBeTrue();
    });
  });
});