import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBookingComponent } from './dashboard-booking.component';

describe('DashboardBookingComponent', () => {
  let component: DashboardBookingComponent;
  let fixture: ComponentFixture<DashboardBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
