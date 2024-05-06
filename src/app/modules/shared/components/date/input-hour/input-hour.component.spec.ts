import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHourComponent } from './input-hour.component';

describe('InputHourComponent', () => {
  let component: InputHourComponent;
  let fixture: ComponentFixture<InputHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputHourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
