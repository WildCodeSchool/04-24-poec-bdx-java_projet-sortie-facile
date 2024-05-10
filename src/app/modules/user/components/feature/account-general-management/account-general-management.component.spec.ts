import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGeneralManagementComponent } from './account-general-management.component';

describe('AccountGeneralManagementComponent', () => {
	let component: AccountGeneralManagementComponent;
	let fixture: ComponentFixture<AccountGeneralManagementComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AccountGeneralManagementComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AccountGeneralManagementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
