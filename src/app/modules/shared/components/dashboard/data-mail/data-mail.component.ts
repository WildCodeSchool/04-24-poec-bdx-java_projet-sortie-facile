import { Component, OnInit } from '@angular/core';
import { Contact } from '@shared/models/classes/contact/contact.class';
import { PaginationOption } from '@shared/models/types/utils/pagination.type';
import { ContactService } from '@shared/services/contact.service';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
	selector: 'app-data-mail',
	templateUrl: './data-mail.component.html',
	styleUrls: ['./data-mail.component.scss'],
})
export class DataMailComponent implements OnInit {
	private contactsSubject = new BehaviorSubject<Contact[]>([]);

	contacts$!: Observable<Contact[]>;
	pagedContacts: Contact[] = [];
	selectedContact: Contact | undefined;
	totalRecords: number = 0;
	rows: number = 5;
	first: number = 0;
	rowsPerPageOptions!: PaginationOption[];

	constructor(private contactService: ContactService) {}

	ngOnInit(): void {
		this.rowsPerPageOptions = [
			{ label: '5', value: 5 },
			{ label: '10', value: 10 },
			{ label: '20', value: 20 },
			{ label: '50', value: 50 },
		];

		this.contacts$ = this.contactsSubject.asObservable();
		this.contactService.getContactList$().subscribe(contacts => {
			this.contactsSubject.next(contacts);
			this.totalRecords = contacts.length;
			this.updatePageContacts(contacts);
		});
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

	onKeyPress(event: Event) {
		if (event instanceof KeyboardEvent && event.key === 'Escape') {
			this.closeMail();
		}
	}

	onPageChange(event: LazyLoadEvent): void {
		this.first = event.first as number;
		this.rows = event.rows as number;
		this.contacts$.subscribe(contacts => {
			this.updatePageContacts(contacts);
		});
	}

	onRowsChange(rows: number): void {
		this.first = 0;
		this.rows = rows;
		this.contacts$.subscribe(contacts => {
			this.updatePageContacts(contacts);
		});
	}

	updatePageContacts(contacts: Contact[]): void {
		this.pagedContacts = contacts.slice(this.first, this.first + this.rows);
	}
}
