import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPseudoComponent } from './avatar-pseudo.component';

describe('AvatarPseudoComponent', () => {
	let component: AvatarPseudoComponent;
	let fixture: ComponentFixture<AvatarPseudoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AvatarPseudoComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AvatarPseudoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
