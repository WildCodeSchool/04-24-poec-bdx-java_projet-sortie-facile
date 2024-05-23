import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingHomeComponent } from '@booking/pages/booking-home/booking-home.component';
import { DashboardBookingComponent } from './pages/dashboard-booking/dashboard-booking.component';

const routes: Routes = [
	{ path: 'home', component: BookingHomeComponent },
	{ path: 'data', component: DashboardBookingComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BookingRoutingModule {}
