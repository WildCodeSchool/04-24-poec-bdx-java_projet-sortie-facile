import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '@shared/services/contact.service';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss',
})
export class ContactComponent {
	constructor(private contactService: ContactService) {}

	formData: {
		Email: string;
		message: string;
	} = {
		Email: '',
		message: '',
	};

	onSubmit(form: NgForm): void {
		this.contactService.postNewContact$(form.value).subscribe();
	}
}
