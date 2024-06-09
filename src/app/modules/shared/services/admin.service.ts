import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FullBookingRouteEnum } from '@shared/models/enums/routes/full-routes';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { MenuItem } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	private navItems: MenuItem[] = [
		{
			id: '1',
			label: 'Graphiques',
			command: () => {
				this._router.navigateByUrl(FullBookingRouteEnum.GRAPH);
			},
			state: { path: FullBookingRouteEnum.GRAPH },
		},
		{
			id: '2',
			label: 'Calendrier',
			command: () => {
				this._router.navigateByUrl(FullBookingRouteEnum.DATA);
			},
			state: { path: FullBookingRouteEnum.DATA },
		},
		{
			id: '3',
			label: 'Emails',
			command: () => {
				this._router.navigateByUrl(FullBookingRouteEnum.MAIL);
			},
			state: { path: FullBookingRouteEnum.MAIL },
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
		{ label: 'Graphiques', path: FullBookingRouteEnum.GRAPH, active: true },
		{
			label: 'Calendrier',
			path: FullBookingRouteEnum.DATA,
			active: false,
		},
		{
			label: 'Emails',
			path: FullBookingRouteEnum.MAIL,
			active: false,
		},
		{
			label: 'Data',
			path: FullBookingRouteEnum.HOME,
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
