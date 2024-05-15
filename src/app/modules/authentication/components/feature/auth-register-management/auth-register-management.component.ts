import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountStatus, UserRoleEnum } from '@shared/models/enums/user-role.enum';
import { AuthRedirect } from '@shared/models/types/auth-redirect.type';
import { newUser } from '@shared/models/types/newUser.model';
import { AuthProvider } from '@shared/models/types/provider.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth/auth.service';
import { map, tap } from 'rxjs';

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

	newUser: newUser = {
		id: '0',
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
		role: UserRoleEnum.USER,
		status: AccountStatus.INACTIVE,
	};

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		// this.authService.increaseId().pipe(
		// 	tap(value => this.lastUserId = value)
		// )
		// .subscribe();
		console.log('lastUserId', this.lastUserId);
		
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

	formNextStep(): void {
		this.formStep = 2;
	}

	formPreviousStep(): void {
		this.formStep = 1;
	}
}
