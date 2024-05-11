import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCardInfoComponent } from './account-card-info.component';

describe('AccountCardInfoComponent', () => {
	let component: AccountCardInfoComponent;
	let fixture: ComponentFixture<AccountCardInfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AccountCardInfoComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AccountCardInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
