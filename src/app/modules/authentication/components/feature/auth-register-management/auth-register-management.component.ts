import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NgForm } from '@angular/forms';
import { AccountStatus, UserRoleEnum } from '@shared/models/enums/user-role.enum';
=======
import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';
>>>>>>> 2fb17e49ec37ad64c88e7032f233791d6e59c48f
import { AuthRedirect } from '@shared/models/types/auth-redirect.type';
import { newUserFormDatas } from '@shared/models/types/newUser.model';
import { AuthProvider } from '@shared/models/types/provider.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-auth-register-management',
	templateUrl: './auth-register-management.component.html',
	styleUrl: './auth-register-management.component.scss',
})
export class AuthRegisterManagementComponent implements OnInit {
	providerNameList!: AuthProvider[];

	lastUserId!: string;

	formStep: number = 1;

	redirect: AuthRedirect = {
		text: 'Vous avez déjà un compte ?',
		link: ['/auth/login'],
		linkLabel: 'Se connecter',
	};

<<<<<<< HEAD
	newUser: newUser = {
=======
	newUser: newUserFormDatas = {
>>>>>>> 2fb17e49ec37ad64c88e7032f233791d6e59c48f
		id: '0',
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
		role: UserRoleEnum.USER,
		status: AccountStatus.ACTIVE,
	};

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.newUser = {
			id: this.lastUserId,
			username: 'Pimpoye',
			email: 'Pimpoye@medoc.fr',
			password: 'mafemmecestmasoeur',
			passwordConfirm: 'mafemmecestmasoeur',
			role: UserRoleEnum.USER,
			status: AccountStatus.ACTIVE,
		};
		this.providerNameList = this.authService.getProviderNameList();
	}

	onSubmit(): void {
		this.authService
			.createUserWithEmailAndPassword(this.newUser)
			.subscribe((user: UserAuthPrimaryDatas) => {
				localStorage.setItem('user', JSON.stringify(user));
			});
<<<<<<< HEAD
	}

	formNextStep(): void {
		this.formStep = 2;
	}

	formPreviousStep(): void {
		this.formStep = 1;
=======
>>>>>>> 2fb17e49ec37ad64c88e7032f233791d6e59c48f
	}
}
