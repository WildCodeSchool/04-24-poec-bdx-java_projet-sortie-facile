import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendarManagementComponent } from './admin-calendar-management.component';

describe('AdminCalendarManagementComponent', () => {
  let component: AdminCalendarManagementComponent;
  let fixture: ComponentFixture<AdminCalendarManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCalendarManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCalendarManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
