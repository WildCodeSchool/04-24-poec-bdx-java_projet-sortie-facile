import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNavComponent } from './layout-nav.component';

describe('LayoutNavComponent', () => {
	let component: LayoutNavComponent;
	let fixture: ComponentFixture<LayoutNavComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LayoutNavComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LayoutNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
