import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmCreatActivityComponent } from './modal-confirm-creat-activity.component';

describe('ModalConfirmCreatActivityComponent', () => {
  let component: ModalConfirmCreatActivityComponent;
  let fixture: ComponentFixture<ModalConfirmCreatActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConfirmCreatActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConfirmCreatActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
