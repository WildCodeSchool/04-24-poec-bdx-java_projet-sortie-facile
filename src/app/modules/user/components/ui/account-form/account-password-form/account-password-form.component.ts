import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserPasswordFormDatas } from '@shared/models/classes/user-password-form-datas.class';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-account-password-form',
	templateUrl: './account-password-form.component.html',
	styleUrl: './account-password-form.component.scss',
})
export class AccountPasswordFormComponent {
	accountPasswordFormDatas: UserPasswordFormDatas = new UserPasswordFormDatas(
		'',
		'',
		'',
	);

	onSubmit(form: NgForm): void {
		console.log(form.value);
	}
}
