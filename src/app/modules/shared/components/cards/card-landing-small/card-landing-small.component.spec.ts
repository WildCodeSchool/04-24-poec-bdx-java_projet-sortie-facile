import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLandingSmallComponent } from './card-landing-small.component';

describe('CardLandingSmallComponent', () => {
	let component: CardLandingSmallComponent;
	let fixture: ComponentFixture<CardLandingSmallComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CardLandingSmallComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CardLandingSmallComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
