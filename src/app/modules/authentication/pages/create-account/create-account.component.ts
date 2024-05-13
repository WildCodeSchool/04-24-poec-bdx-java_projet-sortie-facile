import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { newUser } from '../../../shared/models/types/newUser.model';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.component.html',
	styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
	createdUser: newUser = {
		username: '',
		email: '',
		password: '',
		confirmation: '',
	};

	constructor(private _authService: AuthService) {}

	onSubmit(form: NgForm) {
		// eslint-disable-next-line no-console
		console.log(form.value);
		// TODO verification password = con firmation
		this._authService.createUserWithEmailAndPassword(this.createdUser).subscribe((user: UserAuthPrimaryDatas) => {
			localStorage.setItem('user', JSON.stringify(user));
		});

	}
}
