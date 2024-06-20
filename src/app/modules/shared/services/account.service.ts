import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FullUserRouteEnum } from '@shared/models/enums/routes/full-routes';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { MenuItem } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private navItems: MenuItem[] = [
		{
			id: '1',
			label: 'General',
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.HOME);
			},
			state: { path: FullUserRouteEnum.HOME },
		},
		{
			id: '2',
			label: 'Profil',
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.PROFILE);
			},
			state: { path: FullUserRouteEnum.PROFILE },
		},
		{
			id: '3',
			label: 'Mot de passe',
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.PASSWORD);
			},
			state: { path: FullUserRouteEnum.PASSWORD },
		},
		{
			id: '4',
			label: "Centres d'intérêts",
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.CENTER_OF_INTERESTS);
			},
			state: { path: FullUserRouteEnum.CENTER_OF_INTERESTS },
		},
		{
			id: '5',
			label: 'Notifications',
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.NOTIFICATION);
			},
			state: { path: FullUserRouteEnum.NOTIFICATION },
		},
		{
			id: '6',
			label: 'Mes activités',
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.ACTIVITY);
			},
			state: { path: FullUserRouteEnum.ACTIVITY },
		},
		{
			id: '7',
			label: 'Mes activités',
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.BOOKING);
			},
			state: { path: FullUserRouteEnum.BOOKING },
		},
		{
			id: '8',
			label: 'Mon calendrier',
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.CALENDAR);
			},
			state: { path: FullUserRouteEnum.CALENDAR },
		},
		{
			id: '9',
			label: 'Supprimer mon compte',
			styleClass: 'delete-item',
			state: { path: '' },
		},
	];

	private layoutItems: LayoutLink[] = [
		{ label: 'General', path: FullUserRouteEnum.HOME, active: true },
		{ label: 'Mon profil', path: FullUserRouteEnum.PROFILE, active: false },
		{ label: 'Mot de passe', path: FullUserRouteEnum.PASSWORD, active: false },
		{
			label: "Centres d'intérêts",
			path: FullUserRouteEnum.CENTER_OF_INTERESTS,
			active: false,
		},
		{
			label: 'Notifications',
			path: FullUserRouteEnum.NOTIFICATION,
			active: false,
		},
		{ label: 'Mes activités', path: FullUserRouteEnum.ACTIVITY, active: false },
		{
			label: 'Mes réservations',
			path: FullUserRouteEnum.BOOKING,
			active: false,
		},
		{
			label: 'Mon calendrier',
			path: FullUserRouteEnum.CALENDAR,
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
