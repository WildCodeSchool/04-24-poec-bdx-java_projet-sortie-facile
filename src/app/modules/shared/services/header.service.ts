import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth.service';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HeaderService {
	private _primaryItems$!: Observable<MenuItem[]>;
	private _connectedItems$!: Observable<MenuItem[]>;
	private _notConnectedItems$!: Observable<MenuItem[]>;

	constructor(private _authService: AuthService) {
		this._primaryItems$ = of([
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
		]);

		this._connectedItems$ = of([
			{
				label: 'Mon Compte',
				icon: 'pi pi-fw pi-user',
				routerLink: '/user/home',
			},
			{
				label: 'Déconnexion',
				icon: 'pi pi-power-off',
				command: () => this._authService.logout(),
			},
		]);

		this._notConnectedItems$ = of([
			{
				label: 'Connexion',
				icon: 'pi pi-power-off',
				routerLink: '/auth/login',
			},
			{
				label: 'Inscription',
				icon: 'pi pi-sign-in',
				routerLink: '/auth/register',
			},
		]);
	}

	public getHeaderItems$(): Observable<MenuItem[]> {
		return this._authService.isLoggedIn.pipe(
			switchMap((loggedIn: boolean) => {
				if (loggedIn) {
					return this._combineHeaderItems$(
						this._primaryItems$,
						this._connectedItems$,
					);
				} else {
					return this._combineHeaderItems$(
						this._primaryItems$,
						this._notConnectedItems$,
					);
				}
			}),
		);
	}

	private _combineHeaderItems$(
		primaryItems: Observable<MenuItem[]>,
		secondaryItems: Observable<MenuItem[]>,
	): Observable<MenuItem[]> {
		return combineLatest([primaryItems, secondaryItems]).pipe(
			map(([a, b]) => [...a, ...b]),
		);
	}
}
