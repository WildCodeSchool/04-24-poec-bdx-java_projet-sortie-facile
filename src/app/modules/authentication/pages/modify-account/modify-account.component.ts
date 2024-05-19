import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewUser } from '@shared/models/classes/new-user.class';
import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';
import { newUser } from '@shared/models/types/newUser.model';

@Component({
	selector: 'app-modify-account',
	templateUrl: './modify-account.component.html',
	styleUrl: './modify-account.component.scss',
})
export class ModifyAccountComponent {
	modifiedUser: NewUser = new NewUser(
		'',
		'',
		'',
		'',
		'',
		UserRoleEnum.USER,
		AccountStatus.ACTIVE,
	);

	onSubmit(form: NgForm) {}
}
