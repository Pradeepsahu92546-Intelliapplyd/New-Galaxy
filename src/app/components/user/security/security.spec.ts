// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { Security } from './security';

// describe('Security Component', () => {
//   let component: Security;
//   let fixture: ComponentFixture<Security>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [Security]
//     }).compileComponents();

//     fixture = TestBed.createComponent(Security);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should toggle password visibility when icon clicked_UTSC_001', () => {
//     const icon = fixture.debugElement.query(By.css('.ant-input-password-icon'));
//     expect(component.passwordVisible).toBeFalse();

//     icon.triggerEventHandler('click', {});
//     fixture.detectChanges();

//     expect(component.passwordVisible).toBeTrue();
//   });

//   it('should call changePassword when Change Password button is clicked', () => {
//     spyOn(component, 'changePassword');

//     const btn = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
//     btn.click();
//     fixture.detectChanges();

//     expect(component.changePassword).toHaveBeenCalled();
//   });

//   it('should render device list correctly', () => {
//     const deviceItems = fixture.debugElement.queryAll(By.css('.device-item'));
//     expect(deviceItems.length).toBe(component.devices.length);

//     const firstDeviceName =
//       deviceItems[0].query(By.css('.device-name')).nativeElement.textContent.trim();
//     expect(firstDeviceName).toBe(component.devices[0].name);
//   });

//   it('should call logoutDevice with selected device', () => {
//     spyOn(component, 'logoutDevice');

//     const logoutIcon = fixture.debugElement.queryAll(By.css('.logout-icon'))[0];
//     logoutIcon.triggerEventHandler('click', {});
//     fixture.detectChanges();

//     expect(component.logoutDevice).toHaveBeenCalledWith(component.devices[0]);
//   });

//   it('should call logoutAll when Logout from all devices button is clicked', () => {
//     spyOn(component, 'logoutAll');

//     const btn = fixture.debugElement.query(By.css('.right-panel button')).nativeElement;
//     btn.click();
//     fixture.detectChanges();

//     expect(component.logoutAll).toHaveBeenCalled();
//   });
// });
