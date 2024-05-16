import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	items!: MenuItem[];

	constructor(private _authService: AuthService) {}

	ngOnInit() {
		if (localStorage.getItem('user')) {
			this._authService.setConnectedUserData(
				JSON.parse(localStorage.getItem('user') as string),
			);
			this._authService.notifyLoggedInStatus(true);
		}

		this._authService.isLoggedIn.subscribe((loggedIn: boolean) => {
			this.items = [
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

			if (loggedIn) {
				this.items = [
					...this.items,
					{
						label: 'Mon Compte',
						icon: 'pi pi-fw pi-user',
						routerLink: '/user/home',
					},
				];
			} else {
				this.items = [
					...this.items,
					{
						label: 'Connexion',
						icon: 'pi pi-power-off',
						routerLink: '/auth/login',
					},
				];
			}
		});
	}
}
