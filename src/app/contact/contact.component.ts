import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '@shared/services/contact/contact.service';
import { tap } from 'rxjs';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss',
})
export class ContactComponent {
	constructor(
		private contactService: ContactService,
		private router: Router,
	) {}

	formData: {
		Email: string;
		message: string;
	} = {
		Email: '',
		message: '',
	};

	onSubmit(form: NgForm): void {
		console.log('fvalue', form.value);
		this.contactService
			.postNewContact$(form.value)
			.pipe(
				tap(contact => {
					console.log('test', contact);
				}),
			)
			.subscribe();
	}
}
