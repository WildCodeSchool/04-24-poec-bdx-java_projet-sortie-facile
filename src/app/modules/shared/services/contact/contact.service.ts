import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '@shared/models/types/contact.type';
import { Contacts } from '@shared/models/types/contacts.type';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';

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
