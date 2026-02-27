import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePassword } from './change-password';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

describe('ChangePassword Component (TS logic only)', () => {
  let component: ChangePassword;
  let fixture: ComponentFixture<ChangePassword>;
  let notificationSpy: jasmine.SpyObj<NzNotificationService>;

  beforeEach(async () => {
    notificationSpy = jasmine.createSpyObj('NzNotificationService', ['create']);

    await TestBed.configureTestingModule({
      imports: [ChangePassword, ReactiveFormsModule],
      providers: [
        { provide: NzNotificationService, useValue: notificationSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---------- FAILURE SCENARIOS ----------
  describe("Failure scenarios", () => {
    it('should mark currentPassword invalid when empty_CPCUT_005', () => {
      const control = component.passwordForm.get('currentPassword');
      control?.setValue('');
      expect(control?.invalid).toBeTrue();
      expect(control?.errors?.['required']).toBeTrue();
    });

    it('should mark newPassword invalid if less than 6 chars_CPCUT_006', () => {
      const control = component.passwordForm.get('newPassword');
      control?.setValue('Ab1@');
      expect(control?.invalid).toBeTrue();
      expect(control?.errors?.['minlength']).toBeTruthy();
    });

    it('should mark newPassword invalid if missing complexity_CPCUT_007', () => {
      const control = component.passwordForm.get('newPassword');
      control?.setValue('abcdef');
      expect(control?.invalid).toBeTrue();
      expect(control?.errors?.['pattern']).toBeTruthy();
    });

    it('should mark confirmPassword invalid if empty_CPCUT_008', () => {
      const control = component.passwordForm.get('confirmPassword');
      control?.setValue('');
      expect(control?.invalid).toBeTrue();
      expect(control?.errors?.['required']).toBeTrue();
    });

    it('should add passwordMismatch error when confirmPassword != newPassword_CPCUT_009', () => {
      component.passwordForm.setValue({
        currentPassword: 'Abc@123',
        newPassword: 'Abc@123',
        confirmPassword: 'Wrong@123'
      });
      component.passwordForm.updateValueAndValidity();
      expect(component.passwordForm.errors?.['passwordMismatch']).toBeTrue();
    });
  });

  // ---------- SUCCESS SCENARIOS ----------
  describe("Success scenarios", () => {
    it('should have valid form when passwords match and meet requirements_CPCUT_010', () => {
      component.passwordForm.setValue({
        currentPassword: 'Valid@123',
        newPassword: 'Valid@123',
        confirmPassword: 'Valid@123'
      });
      expect(component.passwordForm.valid).toBeTrue();
      expect(component.passwordForm.errors).toBeNull();
    });

    it('should call changePassword() and notification when form is valid_CPCUT_011', () => {
      spyOn(console, 'log');
      component.passwordForm.setValue({
        currentPassword: 'Abc@123',
        newPassword: 'Abc@123',
        confirmPassword: 'Abc@123'
      });
      component.changePassword();
      expect(console.log).toHaveBeenCalledWith('Change password:', component.passwordForm.value);
      expect(notificationSpy.create).toHaveBeenCalledWith(
        'success',
        'Password Changed Successfully',
        'Your password has changed'
      );
    });

    it('should call markAllAsTouched when form is invalid on submit_CPCUT_012', () => {
      spyOn(component.passwordForm, 'markAllAsTouched');
      component.passwordForm.setValue({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      component.changePassword();
      expect(component.passwordForm.markAllAsTouched).toHaveBeenCalled();
    });
  });

  // ---------- PASSWORD VISIBILITY ----------
  describe("Password visibility", () => {
    it('should toggle currentPassword visibility_CPCUT_013', () => {
      expect(component.passwordVisible1).toBeFalse();
      component.passwordVisible1 = !component.passwordVisible1;
      expect(component.passwordVisible1).toBeTrue();
    });

    it('should toggle newPassword visibility_CPCUT_014', () => {
      expect(component.passwordVisible2).toBeFalse();
      component.passwordVisible2 = !component.passwordVisible2;
      expect(component.passwordVisible2).toBeTrue();
    });

    it('should toggle confirmPassword visibility_CPCUT_015', () => {
      expect(component.passwordVisible3).toBeFalse();
      component.passwordVisible3 = !component.passwordVisible3;
      expect(component.passwordVisible3).toBeTrue();
    });
  });
});
