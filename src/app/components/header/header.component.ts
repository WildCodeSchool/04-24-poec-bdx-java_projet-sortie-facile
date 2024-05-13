import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	items: MenuItem[] | undefined;

	ngOnInit() {
		this.items = [
			{
				label: 'Accueil',
				icon: 'pi pi-fw pi-file',
				routerLink: '/',
			},
			{
				label: 'Contact',
				icon: 'pi pi-fw pi-pencil',
			},

			{
				label: 'Activités',
				icon: 'pi pi-shopping-cart',
				routerLink: '/activity/home',
			},
			{
				label: 'Mon Compte',
				icon: 'pi pi-fw pi-user',
				routerLink: '/user/home',
			},
			{
				label: 'Connexion',
				icon: 'pi pi-power-off',
				routerLink: '/auth/login',
			},
		];
	}
}
