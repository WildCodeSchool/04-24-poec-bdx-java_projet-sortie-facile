import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieBoardComponent } from './pie-board.component';

describe('PieBoardComponent', () => {
  let component: PieBoardComponent;
  let fixture: ComponentFixture<PieBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
