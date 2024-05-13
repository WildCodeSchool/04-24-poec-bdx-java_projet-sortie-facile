import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRedirect } from '@shared/models/types/auth-redirect.type';
import { AuthProvider } from '@shared/models/types/provider.type';
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
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
	};

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.providerNameList = this.authService.getProviderNameList();
	}

	onSubmit(form: NgForm): void {
		console.log('submit register', form.value);
	}
}
