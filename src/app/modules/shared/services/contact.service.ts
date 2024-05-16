import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '@shared/models/types/contact.type';
import { Observable, catchError, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	contacts$!: Contact[];

	constructor(private http: HttpClient) {}

	onSubmit(form: NgForm): void {
		this.postNewContact$(form.value).subscribe();
	}

	postNewContact$(newContact: Contact): Observable<Contact> {
		return this.http.get<Contact[]>('http://localhost:3000/contact').pipe(
			switchMap(contacts => {
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
