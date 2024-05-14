import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { newProfile } from '@shared/models/types/newProfile.type';

@Component({
	selector: 'app-profile-account',
	templateUrl: './profile-account.component.html',
	styleUrl: './profile-account.component.scss',
})
export class ProfileAccountComponent {
	newProfile: newProfile = {
		birthdate: new Date(),
		firstname: '',
		lastname: '',
		city: '',
		avatar: new File([], ''),
		description: '',
	};

	onSubmit(form: NgForm) {
		// eslint-disable-next-line no-console
		console.log(form.value);
	}
}
