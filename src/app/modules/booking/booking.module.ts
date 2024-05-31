import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from '@booking/booking-routing.module';
import { BookingHomeComponent } from '@booking/pages/booking-home/booking-home.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardBookingComponent } from './pages/dashboard-booking/dashboard-booking.component';
import { GraphComponent } from './pages/graph/graph.component';
import { MaildashboardComponent } from './pages/maildashboard/maildashboard.component';

@NgModule({
	declarations: [BookingHomeComponent, DashboardBookingComponent, GraphComponent, MaildashboardComponent],
	imports: [CommonModule, BookingRoutingModule, SharedModule],
})
export class BookingModule {}
