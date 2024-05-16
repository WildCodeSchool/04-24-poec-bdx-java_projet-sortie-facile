import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActivitySmallComponent } from './card-activity-small.component';

describe('CardActivitySmallComponent', () => {
  let component: CardActivitySmallComponent;
  let fixture: ComponentFixture<CardActivitySmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardActivitySmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardActivitySmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
