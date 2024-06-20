import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '@admin/pages/admin-home/admin-home.component';
import { AdminRouteEnum } from '@shared/models/enums/routes/route.enum';
import { AdminMailComponent } from './pages/admin-mail/admin-mail.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';
import { AdminCalendarComponent } from '@booking/components/feature/admin-calendar/admin-calendar.component';

const routes: Routes = [
	{ path: AdminRouteEnum.HOME, component: AdminHomeComponent },
	{ path: AdminRouteEnum.EMAIL, component: AdminMailComponent },
	{ path: AdminRouteEnum.GRAPH, component: AdminStatsComponent },
	{ path: AdminRouteEnum.CALENDAR, component: AdminCalendarComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
