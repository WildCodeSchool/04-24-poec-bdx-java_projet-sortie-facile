import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	FullAdminRouteEnum,
	FullBookingRouteEnum,
} from '@shared/models/enums/routes/full-routes';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { MenuItem } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	private navItems: MenuItem[] = [
		{
			id: '1',
			label: 'Statistiques',
			command: () => {
				this._router.navigateByUrl(FullAdminRouteEnum.GRAPH);
			},
			state: { path: FullAdminRouteEnum.GRAPH },
		},
		{
			id: '2',
			label: 'Emails',
			command: () => {
				this._router.navigateByUrl(FullAdminRouteEnum.EMAIL);
			},
			state: { path: FullAdminRouteEnum.EMAIL },
		},
		{
			id: '4',
			label: 'Data',
			command: () => {
				this._router.navigateByUrl(FullBookingRouteEnum.HOME);
			},
			state: { path: FullBookingRouteEnum.HOME },
		},
	];

	private layoutItems: LayoutLink[] = [
		{ label: 'Graphiques', path: FullAdminRouteEnum.GRAPH, active: true },
		{
			label: 'Emails',
			path: FullAdminRouteEnum.EMAIL,
			active: false,
		},
	];

	constructor(private _router: Router) {}

	public getNavItems() {
		return this.navItems;
	}

	public getLayoutItems() {
		return this.layoutItems;
	}
}
