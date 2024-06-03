import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Testimonial } from '@shared/models/classes/testimonial/testimonial.class';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TestimonialService {
	private readonly _BASE_URL = 'http://localhost:3000/testimonials';

	constructor(private _httpClient: HttpClient) {}

	getTestimonialList$(): Observable<Testimonial[]> {
		return this._httpClient.get<Testimonial[]>(this._BASE_URL);
	}
}
