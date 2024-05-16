import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
				this._router.navigateByUrl('/user/home');
			},
			state: { path: '/user/home' },
		},
		{
			id: '2',
			label: 'Profil',
			command: () => {
				this._router.navigateByUrl('/user/profile');
			},
			state: { path: '/user/profile' },
		},
		{
			id: '3',
			label: 'Mot de passe',
			command: () => {
				this._router.navigateByUrl('/user/password');
			},
			state: { path: '/user/password' },
		},
		{
			id: '4',
			label: "Centres d'intérêts",
			command: () => {
				this._router.navigateByUrl('/user/center-of-interests');
			},
			state: { path: '/user/center-of-interests' },
		},
		{
			id: '5',
			label: 'Notifications',
			command: () => {
				this._router.navigateByUrl('/user/notification');
			},
			state: { path: '/user/notification' },
		},
		{
			id: '6',
			label: 'Mes activités',
			command: () => {
				this._router.navigateByUrl('/user/activities');
			},
			state: { path: '/user/activities' },
		},
		{
			id: '7',
			label: 'Mon calendrier',
			command: () => {
				this._router.navigateByUrl('/user/calendar');
			},
			state: { path: '/user/calendar' },
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
