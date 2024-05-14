import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '@shared/models/types/contact.type';
import { Observable, catchError, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	contacts$!: Contact[];
	constructor(private http: HttpClient) {}

	// getContactList$(): Observable<Contact[]> {
	// 	return this.http
	// 		.get<Contacts>('http://localhost:3000/contact')
	// 		.pipe(map((response: Contacts) => response));
	// }
	onSubmit(form: NgForm): void {
		console.log('fvalue', form.value);
		this.postNewContact$(form.value)
			.pipe(
				tap(contact => {
					console.log('test', contact);
				}),
			)
			.subscribe();
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
			tap(data => {
				console.log('POST Request is successful ', data);
			}),
			catchError(error => {
				console.log('Error', error);
				throw error;
			}),
		);
	}
}
