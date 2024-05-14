import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRoleEnum } from '@shared/models/enums/user-role.enum';
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

	redirect: AuthRedirect = {
		text: 'Vous avez déjà un compte ?',
		link: ['/auth/login'],
		linkLabel: 'Se connecter',
	};

	newUser: any = {
		id: '0',
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
		role: UserRoleEnum.USER
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
			role: UserRoleEnum.USER
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
}
