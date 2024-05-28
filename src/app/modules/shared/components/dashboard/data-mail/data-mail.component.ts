import { Component, OnInit } from '@angular/core';
import { Contact } from '@shared/models/classes/contact/contact.class';
import { ContactService } from '@shared/services/contact.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-data-mail',
	templateUrl: './data-mail.component.html',
	styleUrl: './data-mail.component.scss',
})
export class DataMailComponent implements OnInit {
	contacts$!: Observable<Contact[]>;

	selectedContact!: Contact;

	constructor(private contactService: ContactService) {}
	ngOnInit(): void {
		this.contacts$ = this.contactService.getContactList$();
	}
}
