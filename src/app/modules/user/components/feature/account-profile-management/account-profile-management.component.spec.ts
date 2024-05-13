import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountProfileManagementComponent } from './account-profile-management.component';

describe('AccountProfileManagementComponent', () => {
	let component: AccountProfileManagementComponent;
	let fixture: ComponentFixture<AccountProfileManagementComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AccountProfileManagementComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AccountProfileManagementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
