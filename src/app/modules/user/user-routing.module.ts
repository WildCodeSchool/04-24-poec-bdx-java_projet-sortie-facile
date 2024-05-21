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

const routes: Routes = [
	{
		path: 'home',
		component: UserHomeComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: 'profile',
		component: UserProfileComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: 'password',
		component: UserPasswordComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: 'center-of-interests',
		component: UserCenterOfInterestComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: 'notification',
		component: UserNotificationComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: 'activities',
		component: UserActivitiesComponent,
		canActivate: [isConnectedGuard],
	},
	{
		path: 'calendar',
		component: UserCalendarComponent,
		canActivate: [isConnectedGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
