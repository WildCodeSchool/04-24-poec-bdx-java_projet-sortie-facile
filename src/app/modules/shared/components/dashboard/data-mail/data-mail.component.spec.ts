import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMailComponent } from './data-mail.component';

describe('DataMailComponent', () => {
  let component: DataMailComponent;
  let fixture: ComponentFixture<DataMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
