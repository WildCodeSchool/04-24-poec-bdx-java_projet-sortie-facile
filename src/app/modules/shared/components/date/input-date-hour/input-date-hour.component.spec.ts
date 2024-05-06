import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDateHourComponent } from './input-date-hour.component';

describe('InputDateHourComponent', () => {
  let component: InputDateHourComponent;
  let fixture: ComponentFixture<InputDateHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDateHourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDateHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
