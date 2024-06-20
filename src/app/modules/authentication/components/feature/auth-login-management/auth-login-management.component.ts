import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { AuthProvider } from '@shared/models/types/auth/provider.type';
import { AuthRedirect } from '@shared/models/types/auth/auth-redirect.type';
import { FullAuthenticationRouteEnum } from '@shared/models/enums/routes/full-routes';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthUserCredentials } from '@shared/models/classes/auth-user/auth-user-credentials.class';

@Component({
	selector: 'app-auth-login-management',
	templateUrl: './auth-login-management.component.html',
	styleUrl: './auth-login-management.component.scss',
})
export class AuthLoginManagementComponent implements OnInit {
	providerNameList!: AuthProvider[];
	errorLoginQueryMessage: string | null = null;

	redirect: AuthRedirect = {
		text: 'Vous n’avez pas encore de compte ?',
		link: [FullAuthenticationRouteEnum.REGISTER],
		linkLabel: 'S’inscrire',
	};

	userCredentials: AuthUserCredentials = new AuthUserCredentials(
		'user1@user1.com',
		'user1',
	);

	constructor(
		private _authService: AuthService,
		private _localStorageService: LocalStorageService,
	) {}

	ngOnInit(): void {
		this.providerNameList = this._authService.getProviderNameList();
	}

	onSubmit(form: NgForm): void {
		if (form.status === 'VALID') {
			this._localStorageService.clearToken();
			this._authService.loginWithEmailAndPassword(this.userCredentials);

			// this.authService
			// 	.loginWithEmailAndPassword(
			// 		this.connectedUser.username,
			// 		this.connectedUser.password,
			// 	)
			// 	.subscribe({
			// 		next: (user: AuthUserPrimaryDatas) => {
			// 			localStorage.setItem('user', JSON.stringify(user));
			// 		},
			// 		error: (error: Error) => {
			// 			this.errorLoginQueryMessage = error.message;
			// 		},
			// 	});
		}
	}
}
