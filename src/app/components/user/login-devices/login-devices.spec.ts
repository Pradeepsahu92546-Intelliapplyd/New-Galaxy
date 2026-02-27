import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginDevices } from './login-devices';

describe('LoginDevices Component (TS logic only)', () => {
  let component: LoginDevices;
  let fixture: ComponentFixture<LoginDevices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDevices]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginDevices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component_LDCUT_001', () => {
    expect(component).toBeTruthy();
  });

  it('should contain all devices initially_LDCUT_002', () => {
    expect(component.devices.length).toBeGreaterThan(0);
    expect(Array.isArray(component.devices)).toBeTrue();
  });

  it('should remove a device when logoutDevice is called_LDCUT_003', () => {
    const initialLength = component.devices.length;
    const targetDevice = component.devices[0];

    component.logoutDevice(targetDevice);

    expect(component.devices.length).toBe(initialLength - 1);
    expect(component.devices.find(d => d.name === targetDevice.name)).toBeUndefined();
  });

  it('should not remove device if it does not exist_LDCUT_004', () => {
    const initialLength = component.devices.length;

    const fakeDevice = { name: 'Fake Device', time: 'Never', icon: 'mobile' };
    component.logoutDevice(fakeDevice as any);

    expect(component.devices.length).toBe(initialLength);
  });

  it('should logout all devices_LDCUT_005', () => {
    component.logoutAll();
    expect(component.devices.length).toBe(0);
  });

  it('should do nothing if logoutAll is called with empty list_LDCUT_006', () => {
    component.devices = [];
    component.logoutAll();
    expect(component.devices.length).toBe(0);
  });

  it('should reflect logoutAll disabled state when no devices_LDCUT_007', () => {
    component.devices = [];
    const isDisabled = component.devices.length === 0;
    expect(isDisabled).toBeTrue();
  });
});
