import { Component } from '@angular/core';
import { FullBookingRouteEnum } from '@shared/models/enums/routes/full-routes';

@Component({
	selector: 'app-layout-dashboard',
	templateUrl: './layout-dashboard.component.html',
	styleUrl: './layout-dashboard.component.scss',
})
export class LayoutDashboardComponent {
	fullBookingRouteEnum = FullBookingRouteEnum;
}
