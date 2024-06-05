import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseService } from '@shared/services/auth-response.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		private _authResponseService: AuthResponseService,
		private _localStorageService: LocalStorageService,
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		const token: string | null = this._localStorageService.getToken();

		if (token) {
			const cloned: HttpRequest<unknown> = request.clone({
				headers: request.headers.set('Authorization', 'Bearer ' + token),
			});

			return this.mapStream(cloned, next);
		}

		return this.mapStream(request, next);
	}

	mapStream(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			tap((incomingRequest: HttpEvent<unknown>) => {
				if (incomingRequest instanceof HttpResponse) {
					this._authResponseService.setHttpSuccessSubject$(incomingRequest);
				}
			}),

			catchError((err: HttpErrorResponse) => {
				if (err.status === 404) {
					this._authResponseService.setHttpErrorSubject$(err);
					return throwError(() => new Error(err.error.Error));
				} else {
					this._authResponseService.setHttpErrorSubject$(err);
					return throwError(() => new Error('Une erreur est survenue'));
				}
			}),
		);
	}
}
