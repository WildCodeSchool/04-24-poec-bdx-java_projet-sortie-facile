import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth.service';
import { Observable, combineLatest, of, switchMap } from 'rxjs';
import {
	FullActivityRouteEnum,
	FullAuthenticationRouteEnum,
	FullBookingRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { UserRoleEnum } from '@shared/models/enums/user-role.enum';

@Injectable({
	providedIn: 'root',
})
export class HeaderService {
	private _primaryItems$!: Observable<MenuItem[]>;
	private _adminItems$!: Observable<MenuItem[]>;
	private _userItems$!: Observable<MenuItem[]>;
	private _notConnectedItems$!: Observable<MenuItem[]>;

	constructor(private _authService: AuthService) {
		this._primaryItems$ = of([
			{
				label: 'Accueil',
				routerLink: '/',
			},
			{
				label: 'Activités',
				routerLink: FullActivityRouteEnum.HOME,
			},
			{
				label: 'Contact',
				routerLink: '/contact',
			},
		]);

		this._adminItems$ = of([
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
				separator: true,
			},
			{
				label: 'Dashboard',
				icon: 'pi pi-chart-bar',

				routerLink: FullBookingRouteEnum.GRAPH,
			},
		]);

		this._userItems$ = of([
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
		return combineLatest([
			this._authService.isLoggedIn,
			this._authService.getConnectedUserObservable(),
		]).pipe(
			switchMap(([loggedIn, user]: [boolean, AuthUserPrimaryDatas]) => {
				if (loggedIn) {
					if (user.role === UserRoleEnum.ADMIN) {
						return this._combineHeaderItems$(this._adminItems$);
					} else {
						return this._combineHeaderItems$(this._userItems$);
					}
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
		secondaryItems: Observable<MenuItem[]>,
	): Observable<MenuItem[]> {
		return secondaryItems;
	}
}
