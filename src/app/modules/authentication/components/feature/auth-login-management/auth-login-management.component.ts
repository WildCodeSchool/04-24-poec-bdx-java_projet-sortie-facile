import { Component, OnInit } from '@angular/core';
import { AuthRedirect } from '@shared/models/types/auth-redirect.type';
import { connectedUserDatas } from '@shared/models/types/connectedUserDatas.model';
import { AuthProvider } from '@shared/models/types/provider.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
	selector: 'app-auth-login-management',
	templateUrl: './auth-login-management.component.html',
	styleUrl: './auth-login-management.component.scss',
})
export class AuthLoginManagementComponent implements OnInit {
	providerNameList!: AuthProvider[];

	redirect: AuthRedirect = {
		text: 'Vous n’avez pas encore de compte ?',
		link: ['/auth/register'],
		linkLabel: 'S’inscrire',
	};

	connectedUser: connectedUserDatas = {
		username: 'johndoe',
		password: '123456789',
		email: 'j.doe@mail.com',
	};

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.providerNameList = this.authService.getProviderNameList();
	}

	onSubmit(): void {
		this.authService
			.loginWithEmailAndPassword(
				this.connectedUser.username,
				this.connectedUser.password,
			)
			.subscribe((user: UserAuthPrimaryDatas) => {
				localStorage.setItem('user', JSON.stringify(user));
			});
	}
}