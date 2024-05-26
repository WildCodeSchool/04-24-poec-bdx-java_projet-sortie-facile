import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

export const handleError = (
	route: ActivatedRouteSnapshot,
	errorResponse: HttpErrorResponse,
): Observable<HttpErrorResponse> => {
	return of(errorResponse);
};
