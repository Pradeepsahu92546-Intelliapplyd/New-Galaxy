import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Preferences } from './preferences';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Preferences Component (TS Logic Only)', () => {
  let component: Preferences;
  let fixture: ComponentFixture<Preferences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Preferences, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Preferences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---------- Default Values ----------
  it('should have default theme as light_PCUT_001', () => {
    expect(component.theme).toBe('light');
  });

  it('should have default language as en_PCUT_002', () => {
    expect(component.language).toBe('en');
  });

  it('should have reports disabled by default_PCUT_003', () => {
    expect(component.reports).toBeFalse();
  });

  it('should have promotion disabled by default_PCUT_004', () => {
    expect(component.promotion).toBeFalse();
  });

  // ---------- Success Scenarios ----------
  it('should update theme when changed_PCUT_005', () => {
    component.theme = 'dark';
    expect(component.theme).toBe('dark');
  });

  it('should update language when changed_PCUT_006', () => {
    component.language = 'fr';
    expect(component.language).toBe('fr');
  });

  it('should toggle reports flag_PCUT_007', () => {
    component.reports = false;
    expect(component.reports).toBeFalse();

    component.reports = true;
    expect(component.reports).toBeTrue();
  });

  it('should toggle promotion flag_PCUT_008', () => {
    component.promotion = false;
    expect(component.promotion).toBeFalse();

    component.promotion = true;
    expect(component.promotion).toBeTrue();
  });

  // ---------- Failure / Edge Cases ----------
  it('should handle null theme_PCUT_009', () => {
    component.theme = null as any;
    expect(component.theme).toBeNull();
  });

  it('should handle undefined language_PCUT_010', () => {
    component.language = undefined as any;
    expect(component.language).toBeUndefined();
  });

  it('should allow invalid reports value_PCUT_011', () => {
    component.reports = 'invalid' as any;
    expect(component.reports).toBe('invalid' as any);
  });

  it('should allow invalid promotion value_PCUT_012', () => {
    component.promotion = 'invalid' as any;
    expect(component.promotion).toBe('invalid' as any);
  });
});
