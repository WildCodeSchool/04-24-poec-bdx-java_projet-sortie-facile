import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactListResponseApi } from '@shared/models/classes/contact';
import { Contact } from '@shared/models/classes/contact/contact.class';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	contacts$!: Contact[];
	contact!: Contact;
	private readonly _BASE_URL = 'http://localhost:3000/contact';

	constructor(private http: HttpClient) {}

	onSubmit(form: NgForm): void {
		this.postNewContact$(form.value).subscribe();
	}
	getContactList$(): Observable<Contact[]> {
		return this.http.get<Contact[]>(this._BASE_URL).pipe(
			catchError(error => {
				// Handle the error appropriately here
				console.error('Error fetching contacts:', error);
				return throwError(error); // Rethrow the error for further handling
			}),
		);
	}

	postNewContact$(newContact: Contact): Observable<Contact> {
		return this.http
			.get<ContactListResponseApi>('http://localhost:3000/contact')
			.pipe(
				switchMap((contacts: ContactListResponseApi) => {
					const nextId =
						contacts.length > 0
							? Number(contacts[contacts.length - 1].id) + 1
							: 1;
					newContact.id = String(nextId);

					return this.http.post<Contact>(
						'http://localhost:3000/contact',
						newContact,
					);
				}),
				catchError(error => {
					throw error;
				}),
			);
	}
}
