import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRoleEnum } from '@shared/models/enums/user-role.enum';
import { AuthRedirect } from '@shared/models/types/auth-redirect.type';
import { AuthProvider } from '@shared/models/types/provider.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
	selector: 'app-auth-register-management',
	templateUrl: './auth-register-management.component.html',
	styleUrl: './auth-register-management.component.scss',
})
export class AuthRegisterManagementComponent implements OnInit {
	providerNameList!: AuthProvider[];

	redirect: AuthRedirect = {
		text: 'Vous avez déjà un compte ?',
		link: ['/auth/login'],
		linkLabel: 'Se connecter',
	};

	newUser: any = {
		username: 'Pimpoye',
		email: 'Pimpoye@medoc.fr',
		password: 'mafemmecestmasoeur',
		passwordConfirm: 'mafemmecestmasoeur',
		role: UserRoleEnum.USER
	};

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.providerNameList = this.authService.getProviderNameList();
	}

	onSubmit(form: NgForm): void {
		// console.log('submit register', form.value);
		this.authService
			.createUserWithEmailAndPassword(
				this.newUser
			)
			.subscribe((user: UserAuthPrimaryDatas) => {
				localStorage.setItem('user', JSON.stringify(user));
			});

	}
}
