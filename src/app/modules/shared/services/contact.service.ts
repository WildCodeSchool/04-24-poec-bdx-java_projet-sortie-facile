import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactListResponseApi } from '@shared/models/classes/contact';
import { Contact } from '@shared/models/classes/contact/contact.class';
import { environment } from 'environments/environment';
import {
	BehaviorSubject,
	Observable,
	catchError,
	map,
	switchMap,
	throwError,
} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	contacts$!: Contact[];
	contact!: Contact;
	private readonly _BASE_URL = `${environment.apiUrl}/contact`;
	private newMailSubject = new BehaviorSubject<boolean>(false);
	newMail$ = this.newMailSubject.asObservable();
	constructor(private http: HttpClient) {}

	onSubmit(form: NgForm): void {
		this.postNewContact$(form.value).subscribe();
	}
	getContactList$(): Observable<Contact[]> {
		return this.http.get<Contact[]>(this._BASE_URL).pipe(
			map(contacts => {
				return contacts.sort((a, b) => +b.id - +a.id);
			}),
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

				return this.http.post<Contact>(this._BASE_URL, newContact).pipe(
					switchMap(contact => {
						this.newMailSubject.next(true);
						return [contact];
					}),
					catchError(error => {
						throw error;
					}),
				);
			}),
			catchError(error => {
				throw error;
			}),
		);
	}
	updateContact(contact: Contact): Observable<Contact> {
		const url = `${this._BASE_URL}/${contact.id}`;
		return this.http.put<Contact>(url, contact).pipe(
			catchError(error => {
				return throwError(error);
			}),
		);
	}
}
