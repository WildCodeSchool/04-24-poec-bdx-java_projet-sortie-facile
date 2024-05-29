import { Component, OnInit } from '@angular/core';
import { Contact } from '@shared/models/classes/contact/contact.class';
import { ContactService } from '@shared/services/contact.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-data-mail',
	templateUrl: './data-mail.component.html',
	styleUrls: ['./data-mail.component.scss'],
})
export class DataMailComponent implements OnInit {
	contacts$!: Observable<Contact[]>;
	selectedContact: Contact | undefined;

	constructor(private contactService: ContactService) {}

	ngOnInit(): void {
		this.contacts$ = this.contactService.getContactList$();
	}

	showMail(contact: Contact) {
		this.selectedContact = contact;
	}

	closeMail() {
		this.selectedContact = undefined;
	}

	onRowSelect(event: any) {
		this.showMail(event.data);
	}

	onRowUnselect() {
		this.closeMail();
	}

	// Close modal on ESC key press
	onKeyPress(event: Event) {
		if (event instanceof KeyboardEvent && event.key === 'Escape') {
			this.closeMail();
		}
	}
}
