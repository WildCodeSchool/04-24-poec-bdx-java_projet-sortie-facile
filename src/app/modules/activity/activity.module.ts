import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from '@activity/activity-routing.module';
import { ActivityHomeComponent } from '@activity/pages/activity-home/activity-home.component';
import { ActivityListComponent } from '@activity/pages/activity-list/activity-list.component';
import { ActivityDetailsComponent } from '@activity/pages/activity-details/activity-details.component';
import { ActivityCardComponent } from '@activity/components/ui/activity-card/activity-card.component';
import { SharedModule } from '@shared/shared.module';
import { UpdateActivityComponent } from './pages/update-activity/update-activity.component';
import { ActivityListManagementComponent } from './components/feature/activity-list-management/activity-list-management.component';

@NgModule({
	declarations: [
		ActivityHomeComponent,
		ActivityListComponent,
		ActivityDetailsComponent,
		ActivityCardComponent,
		UpdateActivityComponent,
		ActivityListManagementComponent,
	],
	imports: [CommonModule, ActivityRoutingModule, SharedModule],
})
export class ActivityModule {}
