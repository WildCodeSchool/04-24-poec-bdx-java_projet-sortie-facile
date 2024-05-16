import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmReservationComponent } from './modal-confirm-reservation.component';

describe('ModalConfirmReservationComponent', () => {
  let component: ModalConfirmReservationComponent;
  let fixture: ComponentFixture<ModalConfirmReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConfirmReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConfirmReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
