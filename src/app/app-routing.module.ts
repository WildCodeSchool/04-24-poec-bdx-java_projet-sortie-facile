import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '@admin/admin.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactComponent } from './contact/contact.component';
import { ActivityModule } from '@activity/activity.module';
import { PrimaryRouteEnum } from '@shared/models/enums/routes/route.enum';
import { MentionLegalesComponent } from './mention-legales/mention-legales.component';

const routes: Routes = [
	{
		path: PrimaryRouteEnum.DEFAULT,
		loadChildren: () =>
			import('./modules/landing/landing.module').then(m => m.LandingModule),
	},
	{
		path: PrimaryRouteEnum.ACTIVITY,
		loadChildren: () =>
			import('./modules/activity/activity.module').then(m => m.ActivityModule),
	},
	{
		path: PrimaryRouteEnum.ADMIN,
		loadChildren: () =>
			import('./modules/admin/admin.module').then(m => m.AdminModule),
	},
	{
		path: PrimaryRouteEnum.BOOKING,
		loadChildren: () =>
			import('./modules/booking/booking.module').then(m => m.BookingModule),
	},
	{
		path: PrimaryRouteEnum.USER,
		loadChildren: () =>
			import('./modules/user/user.module').then(m => m.UserModule),
	},
	{
		path: PrimaryRouteEnum.AUTHENTICATION,
		loadChildren: () =>
			import('./modules/authentication/authentication.module').then(
				m => m.AuthenticationModule,
			),
	},
	{ path: PrimaryRouteEnum.CONTACT, component: ContactComponent },
	{
		path: PrimaryRouteEnum.CGU,
		component: MentionLegalesComponent,
	},
	{
		path: PrimaryRouteEnum.NOT_FOUND,
		pathMatch: 'full',
		component: PagenotfoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes), ActivityModule, AdminModule],
	exports: [RouterModule],
})
export class AppRoutingModule {}
