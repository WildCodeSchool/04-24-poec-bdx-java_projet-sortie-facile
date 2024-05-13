import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityModule } from '@activity/activity.module';
import { AdminModule } from '@admin/admin.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./modules/landing/landing.module').then(m => m.LandingModule),
	},
	{
		path: 'activity',
		loadChildren: () =>
			import('./modules/activity/activity.module').then(m => m.ActivityModule),
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./modules/admin/admin.module').then(m => m.AdminModule),
	},
	{
		path: 'booking',
		loadChildren: () =>
			import('./modules/booking/booking.module').then(m => m.BookingModule),
	},
	{
		path: 'user',
		loadChildren: () =>
			import('./modules/user/user.module').then(m => m.UserModule),
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/authentication/authentication.module').then(
				m => m.AuthenticationModule,
			),
	},
	{ path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes), ActivityModule, AdminModule],
	exports: [RouterModule],
})
export class AppRoutingModule {}
