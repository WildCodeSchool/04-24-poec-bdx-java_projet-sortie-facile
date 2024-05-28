import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAxeComponent } from './multi-axe.component';

describe('MultiAxeComponent', () => {
  let component: MultiAxeComponent;
  let fixture: ComponentFixture<MultiAxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiAxeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiAxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
