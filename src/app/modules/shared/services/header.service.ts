import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth.service';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import {
	FullActivityRouteEnum,
	FullAuthenticationRouteEnum,
	FullBookingRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';

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
				icon: 'pi pi-home',
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
				routerLink: FullActivityRouteEnum.HOME,
			},
		]);

		this._connectedItems$ = of([
			{
				label: 'Mon Compte',
				icon: 'pi pi-fw pi-user',
				routerLink: FullUserRouteEnum.HOME,
			},
			{
				label: 'Déconnexion',
				icon: 'pi pi-power-off',
				command: () => this._authService.logout(),
			},
			{
				label: 'Dashboard',
				icon: 'pi pi-chart-bar',
				routerLink: FullBookingRouteEnum.DATA,
			},
		]);

		this._notConnectedItems$ = of([
			{
				label: 'Connexion',
				icon: 'pi pi-power-off',
				routerLink: FullAuthenticationRouteEnum.LOGIN,
			},
			{
				label: 'Inscription',
				icon: 'pi pi-sign-in',
				routerLink: FullAuthenticationRouteEnum.REGISTER,
			},
		]);
	}

	public getIsLoggedInItems$(): Observable<MenuItem[]> {
		return this._authService.isLoggedIn.pipe(
			switchMap((loggedIn: boolean) => {
				if (loggedIn) {
					return this._connectedItems$;
				} else {
					return this._notConnectedItems$;
				}
			}),
		);
	}

	public getPrimaryItems$(): Observable<MenuItem[]> {
		return this._primaryItems$;
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
