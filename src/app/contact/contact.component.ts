import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss',
})
export class ContactComponent {
	formData: {
		Email: string;
		message: string;
	} = {
		Email: '',
		message: '',
	};

	onSubmit(form: NgForm): void {
		console.log('fvalue', form.value);
	}
}
