import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Testimonial } from '@shared/models/classes/testimonial/testimonial.class';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TestimonialService {
	private readonly _BASE_URL = `${environment.apiUrl}/testimonial/all`;

	constructor(private _httpClient: HttpClient) {}

	getTestimonialList$(): Observable<Testimonial[]> {
		return this._httpClient.get<Testimonial[]>(this._BASE_URL);
	}
}
