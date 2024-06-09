import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { AuthService } from '@shared/services/auth.service';

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
	extends BaseManagementComponent
	implements OnInit
{
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
