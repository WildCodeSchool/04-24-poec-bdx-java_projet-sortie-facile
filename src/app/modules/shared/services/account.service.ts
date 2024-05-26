import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FullUserRouteEnum } from '@shared/models/enums/routes/full-routes';
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
			label: 'Mon calendrier',
			command: () => {
				this._router.navigateByUrl(FullUserRouteEnum.CALENDAR);
			},
			state: { path: FullUserRouteEnum.CALENDAR },
		},
		{
			id: '8',
			label: 'Supprimer mon compte',
			styleClass: 'delete-item',
			state: { path: '' },
		},
	];

	private layoutItems: { label: string; styleClass?: string }[] = [
		{ label: 'General' },
		{ label: 'Edit profil' },
		{ label: 'Password' },
		{ label: "Centres d'intérêts" },
		{ label: 'Notifications' },
		{ label: 'Mes activités' },
		{ label: 'Mon calendrier' },
		{ label: 'Supprimer mon compte', styleClass: 'delete-item' },
	];

	constructor(private _router: Router) {}

	public getNavItems() {
		return this.navItems;
	}

	public getLayoutItems() {
		return this.layoutItems;
	}
}
