import { Component, OnInit } from '@angular/core';
import { UserLayoutLink } from '@models/types/user-layout-link';

@Component({
	selector: 'app-layout-nav',
	templateUrl: './layout-nav.component.html',
	styleUrl: './layout-nav.component.scss',
})
export class LayoutNavComponent implements OnInit {
	items!: UserLayoutLink[];

	ngOnInit(): void {
		this.items = [
			{ label: 'General', path: '/user/home', active: true },
			{ label: 'profil', path: '/user/profile', active: false },
			{ label: 'Mot de passe', path: '/user/password', active: false },
			{
				label: 'Centres d’interêts',
				path: '/user/center-of-interests',
				active: false,
			},
			{ label: 'Notifications', path: '/user/notification', active: false },
			{ label: 'Mes activités', path: '/user/activities', active: false },
			{ label: 'Mon calendrier', path: '/user/calendar', active: false },
		];
	}
}
