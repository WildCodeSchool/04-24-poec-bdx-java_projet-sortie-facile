import { Activity } from '@activity/models/classes/activity.class';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ActivityService } from '@shared/services/activity.service';
import { handleError } from '@shared/utils/resolvers-handle-error';
import { Observable, catchError } from 'rxjs';

export const updateActivityResolver: ResolveFn<
	Observable<Activity | HttpErrorResponse>
> = (route: ActivatedRouteSnapshot) => {
	const activityService = inject(ActivityService);
	const id: string = route.paramMap.get('id') as string;

	return activityService
		.getActivityById$(id)
		.pipe(
			catchError((errorResponse: HttpErrorResponse) =>
				handleError(route, errorResponse),
			),
		);
};
