import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBoardComponent } from './vertical-board.component';

describe('VerticalBoardComponent', () => {
  let component: VerticalBoardComponent;
  let fixture: ComponentFixture<VerticalBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
