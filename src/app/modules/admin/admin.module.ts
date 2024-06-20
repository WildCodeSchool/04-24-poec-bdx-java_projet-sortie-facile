import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '@admin/admin-routing.module';
// import { AdminHomeComponent } from '@admin/pages/admin-home/admin-home.component';
// import { AdminMailComponent } from './pages/admin-mail/admin-mail.component';
// import { AdminMailManagementComponent } from './components/feature/admin-mail-management/admin-mail-management.component';
import { SharedModule } from '@shared/shared.module';
// import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';
// import { AdminStatsManagementComponent } from './components/feature/admin-stats-management/admin-stats-management.component';
// import { AdminCalendarManagementComponent } from './components/feature/admin-calendar-management/admin-calendar-management.component';
// import { AdminCalendarComponent } from './pages/admin-calendar/admin-calendar.component';

@NgModule({
	declarations: [
		// 	AdminHomeComponent,
		// 	AdminMailComponent,
		// 	AdminStatsComponent,
		// 	AdminMailManagementComponent,
		// 	AdminStatsManagementComponent,
		// AdminCalendarManagementComponent,
		// AdminCalendarComponent,
	],
	imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
