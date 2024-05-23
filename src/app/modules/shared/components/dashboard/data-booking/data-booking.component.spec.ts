import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBookingComponent } from './data-booking.component';

describe('DataBookingComponent', () => {
  let component: DataBookingComponent;
  let fixture: ComponentFixture<DataBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
