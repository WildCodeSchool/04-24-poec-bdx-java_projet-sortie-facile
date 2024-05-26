import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmDeleteActivityComponent } from './modal-confirm-delete-activity.component';

describe('ModalConfirmDeleteActivityComponent', () => {
	let component: ModalConfirmDeleteActivityComponent;
	let fixture: ComponentFixture<ModalConfirmDeleteActivityComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalConfirmDeleteActivityComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalConfirmDeleteActivityComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
