import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactListResponseApi } from '@shared/models/classes/contact';
import { Contact } from '@shared/models/classes/contact/contact.class';
import { environment } from 'environments/environment';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	contacts$!: Contact[];
	contact!: Contact;
	private readonly _BASE_URL = `${environment.apiUrlJsonServer}/contact`;

	constructor(private http: HttpClient) {}

	onSubmit(form: NgForm): void {
		this.postNewContact$(form.value).subscribe();
	}
	getContactList$(): Observable<Contact[]> {
		return this.http.get<Contact[]>(this._BASE_URL).pipe(
			catchError(error => {
				return throwError(error);
			}),
		);
	}

	postNewContact$(newContact: Contact): Observable<Contact> {
		return this.http.get<ContactListResponseApi>(this._BASE_URL).pipe(
			switchMap((contacts: ContactListResponseApi) => {
				const nextId =
					contacts.length > 0
						? Number(contacts[contacts.length - 1].id) + 1
						: 1;
				newContact.id = String(nextId);

				return this.http.post<Contact>(this._BASE_URL, newContact);
			}),
			catchError(error => {
				throw error;
			}),
		);
	}
}
