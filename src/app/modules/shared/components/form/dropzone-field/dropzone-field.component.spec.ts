import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneFieldComponent } from './dropzone-field.component';

describe('DropzoneFieldComponent', () => {
	let component: DropzoneFieldComponent;
	let fixture: ComponentFixture<DropzoneFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DropzoneFieldComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DropzoneFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
