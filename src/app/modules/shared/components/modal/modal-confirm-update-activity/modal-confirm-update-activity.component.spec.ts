import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmUpdateActivityComponent } from './modal-confirm-update-activity.component';

describe('ModalConfirmUpdateActivityComponent', () => {
  let component: ModalConfirmUpdateActivityComponent;
  let fixture: ComponentFixture<ModalConfirmUpdateActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConfirmUpdateActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConfirmUpdateActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
