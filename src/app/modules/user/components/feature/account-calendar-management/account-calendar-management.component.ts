import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { BaseAccountManagementComponent } from '@user/directives/account-management.class';

@Component({
	selector: 'app-account-calendar-management',
	templateUrl: './account-calendar-management.component.html',
	styleUrl: './account-calendar-management.component.scss',
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr' },
		{ provide: 'FULLCALENDAR_LOCALE', useValue: 'fr' },
	],
})
export class AccountCalendarManagementComponent
	extends BaseAccountManagementComponent
	implements OnInit
{
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
