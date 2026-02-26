import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconService } from 'ng-zorro-antd/icon';

import { Login } from './login';
import { Auth } from '../../../services/auth/auth';
import { Loader } from '../../../shared/components/modal/loader/loader';
import { InputDialog } from '../../../shared/components/modal/dialog/input-dialog/input-dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent - INTEGRATION TESTS', () => {
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

  describe('Login scenarios', () => {
    it('should call auth.login with correct data when form is valid', fakeAsync(() => {
      // Arrange
      const formData = {
        email: 'user@example.com',
        password: 'password123',
        agree: true,
      };
      component.form.patchValue(formData);

      spyOn(authService, 'login').and.returnValue(
        of({
          status: 200,
          message: 'Login successful',
          data: {
            id: '1',
            email: 'user@example.com',
            firstName: 'Demo',
            lastName: 'User',
            token: 'mock-jwt-token',
          },
        })
      );

      // Act
      component.onSubmit();
      tick(1500);

      // Assert
      expect(authService.login).toHaveBeenCalledWith(
        'user@example.com',
        'password123'
      );
    }));

    it('should handle successful login', fakeAsync(() => {
      // Arrange
      const formData = {
        email: 'user@example.com',
        password: 'password123',
        agree: true,
      };
      component.form.patchValue(formData);

      const mockResponse = {
        status: 200,
        message: 'Logged in successfully from API',
        data: {
          id: '1',
          email: 'user@example.com',
          firstName: 'Demo',
          lastName: 'User',
          token: 'mock-jwt-token',
        },
      };
      spyOn(authService, 'login').and.returnValue(of(mockResponse));

      // Act
      component.onSubmit();
      expect(component.loading()).toBeTrue();
      tick(1500);

      // Assert
      expect(component.loading()).toBeFalse();
      expect(notificationService.success).toHaveBeenCalledWith(
        'Welcome',
        'Logged in successfully from API'
      );
      expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    }));

    it('should handle login error with 401 status', fakeAsync(() => {
      // Arrange
      const formData = {
        email: 'user@example.com',
        password: 'wrongpassword',
        agree: true,
      };
      component.form.patchValue(formData);

      const mockError = {
        status: 401,
        error: {
          message: 'Invalid credentials from API',
        },
      };
      spyOn(authService, 'login').and.returnValue(throwError(() => mockError));

      // Act
      component.onSubmit();
      tick();

      // Assert
      expect(component.loading()).toBeFalse();
      expect(notificationService.error).toHaveBeenCalledWith(
        'Login Failed',
        'Invalid credentials from API'
      );
    }));

    // it('should handle login error with 500 status', fakeAsync(() => {
    //   // Arrange
    //   const formData = {
    //     email: 'user@example.com',
    //     password: 'password123',
    //     agree: true,
    //   };
    //   component.form.patchValue(formData);

    //   const mockError = {
    //     status: 500,
    //     error: {
    //       message: 'Internal server error',
    //     },
    //   };
    //   spyOn(authService, 'login').and.returnValue(throwError(() => mockError));

    //   // Act
    //   component.onSubmit();
    //   tick();

    //   // Assert
    //   expect(component.loading()).toBeFalse();
    //   expect(notificationService.error).toHaveBeenCalledWith(
    //     'Login Failed',
    //     'Internal server error'
    //   );
    // }));

    it('should handle login error without status code', fakeAsync(() => {
      // Arrange
      const formData = {
        email: 'user@example.com',
        password: 'password123',
        agree: true,
      };
      component.form.patchValue(formData);

      const mockError = {
        message: 'Network error',
      };
      spyOn(authService, 'login').and.returnValue(throwError(() => mockError));

      // Act
      component.onSubmit();
      tick();

      // Assert
      expect(component.loading()).toBeFalse();
      expect(notificationService.error).toHaveBeenCalledWith(
        'Login Failed',
        'Network error'
      );
    }));

    it('should handle login error without any error details', fakeAsync(() => {
      // Arrange
      const formData = {
        email: 'user@example.com',
        password: 'password123',
        agree: true,
      };
      component.form.patchValue(formData);

      spyOn(authService, 'login').and.returnValue(throwError(() => ({})));

      // Act
      component.onSubmit();
      tick();

      // Assert
      expect(component.loading()).toBeFalse();
      expect(notificationService.error).toHaveBeenCalledWith(
        'Login Failed',
        'An unexpected error occurred'
      );
    }));
  });

  describe('Forgot password scenarios', () => {
    it('should handle forgot password with valid email', fakeAsync(() => {
      // Arrange
      const testEmail = 'test@example.com';
      spyOn(authService, 'forgotPassword').and.returnValue(
        of({
          success: true,
          message: 'Password reset link has been sent to your email',
          resetToken: 'mock-token',
        })
      );

      // Act
      component.handleForgotPassword(testEmail);
      expect(component.forgotPasswordLoading()).toBeTrue();
      tick(800);

      // Assert
      expect(component.forgotPasswordLoading()).toBeFalse();
      expect(authService.forgotPassword).toHaveBeenCalledWith(testEmail);
      expect(notificationService.success).toHaveBeenCalledWith(
        'Success',
        'Password reset link has been sent to your email'
      );
    }));

    it('should handle forgot password with invalid email', () => {
      // Act
      component.handleForgotPassword(undefined);

      // Assert
      expect(notificationService.error).toHaveBeenCalledWith(
        'Error',
        'Please enter a valid email address'
      );
    });

    it('should handle forgot password error', fakeAsync(() => {
      // Arrange
      const testEmail = 'test@example.com';
      spyOn(authService, 'forgotPassword').and.returnValue(
        throwError(() => ({
          message: 'Email not found',
        }))
      );

      // Act
      component.handleForgotPassword(testEmail);
      tick();

      // Assert
      expect(component.forgotPasswordLoading()).toBeFalse();
      expect(notificationService.error).toHaveBeenCalledWith(
        'Error',
        'Email not found'
      );
    }));

    it('should handle forgot password error without message', fakeAsync(() => {
      // Arrange
      const testEmail = 'test@example.com';
      spyOn(authService, 'forgotPassword').and.returnValue(
        throwError(() => ({}))
      );

      // Act
      component.handleForgotPassword(testEmail);
      tick();

      // Assert
      expect(component.forgotPasswordLoading()).toBeFalse();
      expect(notificationService.error).toHaveBeenCalledWith(
        'Error',
        'Failed to send password reset link'
      );
    }));
  });
});