import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLandingLargeComponent } from './card-landing-large.component';

describe('CardLandingLargeComponent', () => {
	let component: CardLandingLargeComponent;
	let fixture: ComponentFixture<CardLandingLargeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CardLandingLargeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CardLandingLargeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
