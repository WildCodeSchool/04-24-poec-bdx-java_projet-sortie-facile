import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class HeaderService {
	private primaryItems!: MenuItem[];
	private connectedItems!: MenuItem[];
	private notConnectedItems!: MenuItem[];

	constructor() {
		this.primaryItems = [
			{
				label: 'Accueil',
				icon: 'pi pi-fw pi-file',
				routerLink: '/',
			},
			{
				label: 'Contact',
				icon: 'pi pi-fw pi-pencil',
				routerLink: '/contact',
			},
			{
				label: 'Activités',
				icon: 'pi pi-shopping-cart',
				routerLink: '/activity/home',
			},
		];

		this.connectedItems = [
			{
				label: 'Mon Compte',
				icon: 'pi pi-fw pi-user',
				routerLink: '/user/home',
			},
		];

		this.notConnectedItems = [
			{
				label: 'Connexion',
				icon: 'pi pi-power-off',
				routerLink: '/auth/login',
			},
		];
	}

	public getPrimaryItems(): MenuItem[] {
		return this.primaryItems;
	}

	public getConnectedItems(loggedIn: boolean): MenuItem[] {
		if (loggedIn) {
			return [...this.primaryItems, ...this.connectedItems];
		} else {
			return [...this.primaryItems, ...this.notConnectedItems];
		}
	}
}
