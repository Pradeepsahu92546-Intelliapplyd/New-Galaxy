
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagement } from './account-management';
import { Confirmation } from '../../../shared/components/modal/dialogs/confirmation/confirmation';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AccountManagement Component', () => {
    let component: AccountManagement;
    let fixture: ComponentFixture<AccountManagement>;
    let notificationSpy: jasmine.SpyObj<NzNotificationService>;

    beforeEach(async () => {
        notificationSpy = jasmine.createSpyObj('NzNotificationService', ['success']);

        await TestBed.configureTestingModule({
            imports: [AccountManagement, NoopAnimationsModule],
            providers: [{ provide: NzNotificationService, useValue: notificationSpy }]
        }).compileComponents();

        fixture = TestBed.createComponent(AccountManagement);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    
    describe("Success Scenarios", () => {
        it('should call deleteAccount() and show notification on confirm_AMCUT_004', () => {
            spyOn(component, 'deleteAccount').and.callThrough();

            component.deleteAccount();
            fixture.detectChanges();

            expect(component.deleteAccount).toHaveBeenCalled();
            // verify notification is triggered
            setTimeout(() => {
                expect(notificationSpy.success).toHaveBeenCalledWith(
                    'Sent',
                    'Password reset link sent to your registered email id successfully'
                );
            }, 1600);
        });

        it('should call deactivateAccount() on confirm_AMCUT_005', () => {
            spyOn(component, 'deactivateAccount').and.callThrough();

            component.deactivateAccount();
            fixture.detectChanges();

            expect(component.deactivateAccount).toHaveBeenCalled();
        });

        it('should trigger delete confirmation modal_AMCUT_006', () => {
            const mockConfirm = jasmine.createSpyObj('Confirmation', ['showConfirm']);
            component.deleteConfirm = mockConfirm;

            component.triggerDelete();
            expect(mockConfirm.showConfirm).toHaveBeenCalled();
        });

        it('should trigger deactivate confirmation modal_AMCUT_007', () => {
            const mockConfirm = jasmine.createSpyObj('Confirmation', ['showConfirm']);
            component.deactivateConfirm = mockConfirm;

            component.triggerDeactivate();
            expect(mockConfirm.showConfirm).toHaveBeenCalled();
        });
        it('should call notification.success after timeout in deleteAccount_AMCUT_008', fakeAsync(() => {
            component.deleteAccount();   // call the method
            tick(1500);                  // fast-forward 1500ms timer
            fixture.detectChanges();

            expect(notificationSpy.success).toHaveBeenCalledWith(
                'Sent',
                'Password reset link sent to your registered email id successfully'
            );
        }));
    })

    describe("Failure Scenarios", () => {
        it('should handle if deleteConfirm ViewChild is missing_AMCUT_009', () => {
            component.deleteConfirm = null as any;
            expect(() => component.triggerDelete()).toThrowError();
        });

        it('should handle if deactivateConfirm ViewChild is missing_AMCUT_010', () => {
            component.deactivateConfirm = null as any;
            expect(() => component.triggerDeactivate()).toThrowError();
        });

        it('should not crash if notification service fails_AMCUT_011', () => {
            notificationSpy.success.and.throwError('Notification error');
            expect(() => component.deleteAccount()).not.toThrow();
        });
    })
});
