import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountContainerContentComponent } from './account-container-content.component';

describe('AccountContainerContentComponent', () => {
	let component: AccountContainerContentComponent;
	let fixture: ComponentFixture<AccountContainerContentComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AccountContainerContentComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AccountContainerContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
