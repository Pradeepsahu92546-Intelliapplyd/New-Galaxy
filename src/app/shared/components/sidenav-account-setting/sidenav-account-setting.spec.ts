import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAccountSetting } from './sidenav-account-setting';

describe('SidenavAccountSetting', () => {
  let component: SidenavAccountSetting;
  let fixture: ComponentFixture<SidenavAccountSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavAccountSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavAccountSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
