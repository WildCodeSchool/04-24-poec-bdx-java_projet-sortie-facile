import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { AuthProvider } from '@shared/models/types/auth/provider.type';
import { AuthRedirect } from '@shared/models/types/auth/auth-redirect.type';
import { UserConnectedDatas } from '@shared/models/classes/utils/user-connected-datas.class';
import { FullAuthenticationRouteEnum } from '@shared/models/enums/routes/full-routes';

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

	connectedUser: UserConnectedDatas = new UserConnectedDatas(
		'johndoe',
		'123456789',
		'j.doe@test.com',
	);

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.providerNameList = this.authService.getProviderNameList();
	}

	onSubmit(form: NgForm): void {
		if (form.status === 'VALID') {
			this.authService
				.loginWithEmailAndPassword(
					this.connectedUser.username,
					this.connectedUser.password,
				)
				.subscribe({
					next: (user: AuthUserPrimaryDatas) => {
						localStorage.setItem('user', JSON.stringify(user));
					},
					error: (error: Error) => {
						this.errorLoginQueryMessage = error.message;
					},
				});
		}
	}
}
