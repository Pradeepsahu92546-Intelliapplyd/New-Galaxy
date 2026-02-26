import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconService } from 'ng-zorro-antd/icon';

import { Register } from './register';
import { Auth } from '../../../services/auth/auth';
import { Loader } from '../../../shared/components/modal/loader/loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent - INTEGRATION TESTS', () => {
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

  it('should call auth.register with correct data when form is valid', fakeAsync(() => {
    // Arrange
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '9876543210',
      accountType: 'individual',
      userType: 'admin',
      password: 'password123',
      confirmPassword: 'password123',
      agree: true,
    };

    component.form.patchValue(formData);

    // Spy on the actual authService.register method and return a mock response
    spyOn(authService, 'register').and.returnValue(
      of({
        status: 201,
        message: 'Signup successful. Please verify your email',
        data: {},
      })
    );

    // Act
    component.onSubmit();
    tick(1500);

    // Assert
    expect(authService.register).toHaveBeenCalled();
    const expectedCallData = { ...formData };
    delete (expectedCallData as { confirmPassword?: string }).confirmPassword;
    expect(authService.register).toHaveBeenCalledWith(expectedCallData);
  }));

  it('should handle successful registration', fakeAsync(() => {
    // Arrange
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '9876543210',
      accountType: 'individual',
      userType: 'admin',
      password: 'password123',
      confirmPassword: 'password123',
      agree: true,
    };

    component.form.patchValue(formData);

    // Spy on the actual authService.register method
    spyOn(authService, 'register').and.returnValue(
      of({
        status: 201,
        message: 'Signup successful. Please verify your email',
        data: {},
      })
    );

    // Act
    component.onSubmit();
    expect(component.loading()).toBeTrue();

    tick(1500);

    // Assert
    expect(component.loading()).toBeFalse();
    expect(notificationService.success).toHaveBeenCalledWith(
      'Success',
      'Signup successful. Please verify your email'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/auth/verify-email'], {
      queryParams: { email: 'john@example.com' },
    });
  }));

  it('should handle registration error with 400 status', fakeAsync(() => {
    // Arrange
    const errorMessage = 'Email already exists';
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '9876543210',
      accountType: 'individual',
      userType: 'admin',
      password: 'password123',
      confirmPassword: 'password123',
      agree: true,
    };

    component.form.patchValue(formData);

    // Spy on the actual authService.register method to return error
    spyOn(authService, 'register').and.returnValue(
      throwError(() => ({
        status: 400,
        error: { message: errorMessage },
      }))
    );

    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(component.loading()).toBeFalse();
    expect(notificationService.error).toHaveBeenCalledWith(
      'Registration Failed',
      errorMessage
    );
  }));

  it('should handle registration error without specific message', fakeAsync(() => {
    // Arrange
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '9876543210',
      accountType: 'individual',
      userType: 'admin',
      password: 'password123',
      confirmPassword: 'password123',
      agree: true,
    };

    component.form.patchValue(formData);

    // Spy on the actual authService.register method to return generic error
    spyOn(authService, 'register').and.returnValue(
      throwError(() => ({ status: 500 })) // No error message
    );

    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(component.loading()).toBeFalse();
    expect(notificationService.error).toHaveBeenCalledWith(
      'Server Error',
      'Please try again later'
    );
  }));

  it('should handle registration error without status code', fakeAsync(() => {
    // Arrange
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '9876543210',
      accountType: 'individual',
      userType: 'admin',
      password: 'password123',
      confirmPassword: 'password123',
      agree: true,
    };

    component.form.patchValue(formData);

    // Spy on the actual authService.register method to return error without status
    spyOn(authService, 'register').and.returnValue(
      throwError(() => ({ message: 'Network error' }))
    );

    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(component.loading()).toBeFalse();
    expect(notificationService.error).toHaveBeenCalledWith(
      'Registration Failed',
      'Network error'
    );
  }));

  it('should handle registration error without any error details', fakeAsync(() => {
    // Arrange
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '9876543210',
      accountType: 'individual',
      userType: 'admin',
      password: 'password123',
      confirmPassword: 'password123',
      agree: true,
    };

    component.form.patchValue(formData);

    // Spy on the actual authService.register method to return empty error
    spyOn(authService, 'register').and.returnValue(
      throwError(() => ({})) // Empty error object
    );

    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(component.loading()).toBeFalse();
    expect(notificationService.error).toHaveBeenCalledWith(
      'Registration Failed',
      'An unexpected error occurred'
    );
  }));
});