import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsConnectedGuard } from '@shared/guards/is-connected.guard';
import { UserHomeComponent } from '@user/pages/user-home/user-home.component';
// import { UserProfileComponent } from '@user/pages/user-profile/user-profile.component';
// import { UserPasswordComponent } from '@user/pages/user-password/user-password.component';
// import { UserCenterOfInterestComponent } from '@user/pages/user-center-of-interest/user-center-of-interest.component';
// import { UserNotificationComponent } from '@user/pages/user-notification/user-notification.component';
// import { UserActivitiesComponent } from '@user/pages/user-activities/user-activities.component';
// import { UserCalendarComponent } from '@user/pages/user-calendar/user-calendar.component';
import { UserRouteEnum } from '@shared/models/enums/routes/route.enum';
// import { UserBookingComponent } from './pages/user-booking/user-booking.component';

const routes: Routes = [
	{
		path: UserRouteEnum.HOME,
		component: UserHomeComponent,
		canActivate: [IsConnectedGuard],
	},
	// {
	// 	path: UserRouteEnum.PROFILE,
	// 	component: UserProfileComponent,
	// 	canActivate: [IsConnectedGuard],
	// },
	// {
	// 	path: UserRouteEnum.PASSWORD,
	// 	component: UserPasswordComponent,
	// 	canActivate: [IsConnectedGuard],
	// },
	// {
	// 	path: UserRouteEnum.CENTER_OF_INTERESTS,
	// 	component: UserCenterOfInterestComponent,
	// 	canActivate: [IsConnectedGuard],
	// },
	// {
	// 	path: UserRouteEnum.NOTIFICATION,
	// 	component: UserNotificationComponent,
	// 	canActivate: [IsConnectedGuard],
	// },
	// {
	// 	path: UserRouteEnum.ACTIVITY,
	// 	component: UserActivitiesComponent,
	// 	canActivate: [IsConnectedGuard],
	// },
	// {
	// 	path: UserRouteEnum.CALENDAR,
	// 	component: UserCalendarComponent,
	// 	canActivate: [IsConnectedGuard],
	// },
	// {
	// 	path: UserRouteEnum.BOOKING,
	// 	component: UserBookingComponent,
	// 	canActivate: [IsConnectedGuard],
	// },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
