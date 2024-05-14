import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { newUser, newUserDatas } from '../../../shared/models/types/newUser.model';
import { AuthService } from '@shared/services/auth/auth.service';
import { AccountStatus, UserRoleEnum } from '@shared/models/enums/user-role.enum';

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.component.html',
	styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
	createdUser: newUser = {
		id: '0',
		username: '',
		email: '',
		password: '',
		confirmation: '',
		role: UserRoleEnum.USER,
		status: AccountStatus.ACTIVE,
	};

	constructor(private _authService: AuthService) {}

	onSubmit(form: NgForm) {
		console.log(form.value);
		// TODO verification password = confirmation
		this.createdUser.createUserWithEmailAndPassword(this.createdUser).subscribe((user: newUserDatas) => {
			localStorage.setItem('user', JSON.stringify(user));
		});

	}
}
