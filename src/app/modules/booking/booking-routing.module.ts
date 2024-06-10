import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingHomeComponent } from '@booking/pages/booking-home/booking-home.component';
import { DashboardBookingComponent } from './pages/dashboard-booking/dashboard-booking.component';
import { BookingRouteEnum } from '@shared/models/enums/routes/route.enum';
import { GraphComponent } from './pages/graph/graph.component';

const routes: Routes = [
	{ path: BookingRouteEnum.GRAPH, component: GraphComponent },
	{ path: BookingRouteEnum.HOME, component: BookingHomeComponent },
	{ path: BookingRouteEnum.DATA, component: DashboardBookingComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BookingRoutingModule {}
