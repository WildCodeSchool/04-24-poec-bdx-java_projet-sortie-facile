import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isConnectedGuard } from '@shared/guards/is-connected.guard';
import { UserHomeComponent } from '@user/pages/user-home/user-home.component';
import { UserProfileComponent } from '@user/pages/user-profile/user-profile.component';
import { UserPasswordComponent } from '@user/pages/user-password/user-password.component';
import { UserCenterOfInterestComponent } from '@user/pages/user-center-of-interest/user-center-of-interest.component';
import { UserNotificationComponent } from '@user/pages/user-notification/user-notification.component';
import { UserActivitiesComponent } from '@user/pages/user-activities/user-activities.component';
import { UserCalendarComponent } from '@user/pages/user-calendar/user-calendar.component';
import { UserRouteEnum } from '@shared/models/enums/routes/route.enum';
import { UserBookingComponent } from './pages/user-booking/user-booking.component';

const routes: Routes = [
	{
		path: UserRouteEnum.HOME,
		component: UserHomeComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: UserRouteEnum.PROFILE,
		component: UserProfileComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: UserRouteEnum.PASSWORD,
		component: UserPasswordComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: UserRouteEnum.CENTER_OF_INTERESTS,
		component: UserCenterOfInterestComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: UserRouteEnum.NOTIFICATION,
		component: UserNotificationComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: UserRouteEnum.ACTIVITY,
		component: UserActivitiesComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: UserRouteEnum.CALENDAR,
		component: UserCalendarComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: UserRouteEnum.BOOKING,
		component: UserBookingComponent,
		canActivate: [isConnectedGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
