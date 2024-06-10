import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from '@booking/booking-routing.module';
import { BookingHomeComponent } from '@booking/pages/booking-home/booking-home.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardBookingComponent } from './pages/dashboard-booking/dashboard-booking.component';
import { AdminCalendarComponent } from './components/feature/admin-calendar/admin-calendar.component';
import { BookingDataManagementComponent } from './components/feature/booking-data-management/booking-data-management.component';
import { BookingHomeManagementComponent } from './components/feature/booking-home-management/booking-home-management.component';

@NgModule({
	declarations: [
		BookingHomeComponent,
		DashboardBookingComponent,
		AdminCalendarComponent,
		BookingDataManagementComponent,
		BookingHomeManagementComponent,
	],
	imports: [CommonModule, BookingRoutingModule, SharedModule],
})
export class BookingModule {}
