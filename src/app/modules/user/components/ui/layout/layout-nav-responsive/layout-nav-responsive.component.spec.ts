import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNavResponsiveComponent } from './layout-nav-responsive.component';

describe('LayoutNavResponsiveComponent', () => {
	let component: LayoutNavResponsiveComponent;
	let fixture: ComponentFixture<LayoutNavResponsiveComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LayoutNavResponsiveComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LayoutNavResponsiveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
