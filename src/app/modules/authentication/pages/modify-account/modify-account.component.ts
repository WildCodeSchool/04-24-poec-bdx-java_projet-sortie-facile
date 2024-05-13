import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { newUser } from '@shared/models/types/newUser.model';

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrl: './modify-account.component.scss'
})
export class ModifyAccountComponent {
    modifiedUser: newUser = {
		username: '',
		email: '',
		password: '',
		confirmation: '',
	};

	onSubmit(form: NgForm) {
		// eslint-disable-next-line no-console
		console.log(form.value);
	}
}
