import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from '@booking/booking-routing.module';
import { BookingHomeComponent } from '@booking/pages/booking-home/booking-home.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardBookingComponent } from './pages/dashboard-booking/dashboard-booking.component';
import { GraphComponent } from './pages/graph/graph.component';
import { MaildashboardComponent } from './pages/maildashboard/maildashboard.component';
import { AdminCalendarComponent } from './components/feature/admin-calendar/admin-calendar.component';
import { BookingMailManagementComponent } from './components/feature/booking-mail-management/booking-mail-management.component';
import { DashboardLayoutComponent } from './components/ui/dashboard-layout/dashboard-layout.component';
import { LayoutHeaderComponent } from './components/ui/layout/layout-header/layout-header.component';
import { LayoutNavComponent } from './components/ui/layout/layout-nav/layout-nav.component';
import { LayoutNavResponsiveComponent } from './components/ui/layout/layout-nav-responsive/layout-nav-responsive.component';
import { BookingGraphManagementComponent } from './components/feature/booking-graph-management/booking-graph-management.component';
import { BookingDataManagementComponent } from './components/feature/booking-data-management/booking-data-management.component';
import { BookingHomeManagementComponent } from './components/feature/booking-home-management/booking-home-management.component';

@NgModule({
	declarations: [
		BookingHomeComponent,
		DashboardBookingComponent,
		GraphComponent,
		MaildashboardComponent,
		AdminCalendarComponent,
		DashboardLayoutComponent,
		BookingMailManagementComponent,
		LayoutHeaderComponent,
		LayoutNavComponent,
		LayoutNavResponsiveComponent,
  BookingGraphManagementComponent,
  BookingDataManagementComponent,
  BookingHomeManagementComponent,
	],
	imports: [CommonModule, BookingRoutingModule, SharedModule],
})
export class BookingModule {}
