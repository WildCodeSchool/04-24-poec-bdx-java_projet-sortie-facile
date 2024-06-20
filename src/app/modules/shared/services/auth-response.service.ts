import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthUserResponseService {
	private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> =
		new BehaviorSubject(new HttpErrorResponse({}));

	private _httpSuccessSubject$: BehaviorSubject<HttpResponse<unknown>> =
		new BehaviorSubject(new HttpResponse({}));

	getHttpErrorSubject$(): Observable<HttpErrorResponse> {
		return this._httpErrorSubject$.asObservable();
	}

	setHttpErrorSubject$(error: HttpErrorResponse): void {
		this._httpSuccessSubject$.next(new HttpResponse({}));
		this._httpErrorSubject$.next(error);
	}

	getHttpSuccessSubject$(): Observable<HttpResponse<unknown>> {
		return this._httpSuccessSubject$.asObservable();
	}

	setHttpSuccessSubject$(success: HttpResponse<unknown>): void {
		this._httpErrorSubject$.next(new HttpErrorResponse({}));
		this._httpSuccessSubject$.next(success);
	}
}
