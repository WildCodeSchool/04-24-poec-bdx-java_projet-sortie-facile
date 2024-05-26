import { Component, OnInit } from '@angular/core';
import { FullUserRouteEnum } from '@shared/models/enums/routes/full-routes';
import { UserLayoutLink } from '@shared/models/types/utils/user-layout-link.type';

@Component({
	selector: 'app-layout-nav',
	templateUrl: './layout-nav.component.html',
	styleUrl: './layout-nav.component.scss',
})
export class LayoutNavComponent implements OnInit {
	items!: UserLayoutLink[];

	ngOnInit(): void {
		this.items = [
			{ label: 'General', path: FullUserRouteEnum.HOME, active: true },
			{ label: 'profil', path: FullUserRouteEnum.PROFILE, active: false },
			{
				label: 'Mot de passe',
				path: FullUserRouteEnum.PASSWORD,
				active: false,
			},
			{
				label: 'Centres d’interêts',
				path: FullUserRouteEnum.CENTER_OF_INTERESTS,
				active: false,
			},
			{
				label: 'Notifications',
				path: FullUserRouteEnum.NOTIFICATION,
				active: false,
			},
			{
				label: 'Mes activités',
				path: FullUserRouteEnum.ACTIVITY,
				active: false,
			},
			{
				label: 'Mon calendrier',
				path: FullUserRouteEnum.CALENDAR,
				active: false,
			},
		];
	}
}
