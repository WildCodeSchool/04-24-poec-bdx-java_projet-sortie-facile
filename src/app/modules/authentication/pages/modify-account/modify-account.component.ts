import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountStatus, UserRoleEnum } from '@shared/models/enums/user-role.enum';
import { newUser } from '@shared/models/types/newUser.model';

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrl: './modify-account.component.scss'
})
export class ModifyAccountComponent {
    modifiedUser: newUser = {
		id: '0',
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
		role: UserRoleEnum.USER,
		status: AccountStatus.ACTIVE,
	};

	onSubmit(form: NgForm) {
		// eslint-disable-next-line no-console
		console.log(form.value);
	}
}
