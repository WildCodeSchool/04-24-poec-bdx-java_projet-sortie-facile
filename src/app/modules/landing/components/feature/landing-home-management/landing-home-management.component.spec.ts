import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHomeManagementComponent } from './landing-home-management.component';

describe('LandingHomeManagementComponent', () => {
	let component: LandingHomeManagementComponent;
	let fixture: ComponentFixture<LandingHomeManagementComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LandingHomeManagementComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LandingHomeManagementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
