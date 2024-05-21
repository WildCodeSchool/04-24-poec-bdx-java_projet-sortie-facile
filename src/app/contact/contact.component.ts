import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '@shared/services/contact.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnDestroy {
	private _subscription: Subscription = new Subscription();

	constructor(private contactService: ContactService) {}

	formData: {
		Email: string;
		message: string;
	} = {
		Email: '',
		message: '',
	};

	onSubmit(form: NgForm): void {
		this._subscription.add(
			this.contactService.postNewContact$(form.value).subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
