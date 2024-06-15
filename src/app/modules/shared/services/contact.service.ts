import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '@shared/models/classes/contact/contact.class';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	contacts$!: Contact[];
	contact!: Contact;

	private newMailSubject = new BehaviorSubject<boolean>(false);
	newMail$ = this.newMailSubject.asObservable();

	private readonly _BASE_URL = `${environment.apiUrl}/contact`;

	constructor(private http: HttpClient) {}

	onSubmit(form: NgForm): void {
		this.postNewContact$(form.value).subscribe();
	}

	getContactList$(): Observable<Contact[]> {
		return this.http.get<Contact[]>(`${this._BASE_URL}/all`).pipe(
			catchError(error => {
				return throwError(() => error);
			}),
		);
	}

	postNewContact$(newContact: Contact): Observable<Contact> {
		return this.http.post<Contact>(`${this._BASE_URL}/add`, newContact).pipe(
			catchError(error => {
				return throwError(() => error);
			}),
		);
	}

	updateContact(contact: Contact): Observable<Contact> {
		return this.http
			.put<Contact>(`${this._BASE_URL}/${contact.id}`, contact)
			.pipe(
				catchError(error => {
					return throwError(() => error);
				}),
			);
	}
}
