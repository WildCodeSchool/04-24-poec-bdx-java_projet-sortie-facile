import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from '@activity/activity-routing.module';
import { ActivityListComponent } from '@activity/pages/activity-list/activity-list.component';
import { ActivityDetailsComponent } from '@activity/pages/activity-details/activity-details.component';
import { ActivityCardComponent } from '@activity/components/ui/activity-card/activity-card.component';
import { SharedModule } from '@shared/shared.module';
import { UpdateActivityComponent } from './pages/update-activity/update-activity.component';
import { ActivityListManagementComponent } from './components/feature/activity-list-management/activity-list-management.component';
import { ActivityCreateManagementComponent } from './components/feature/activity-create-management/activity-create-management.component';
import { ActivityCreateComponent } from './pages/activity-create/activity-create.component';
import { ActivityFormLayoutComponent } from './components/ui/activity-form-layout/activity-form-layout.component';

@NgModule({
	declarations: [
		ActivityCreateManagementComponent,
		ActivityListComponent,
		ActivityDetailsComponent,
		ActivityCardComponent,
		UpdateActivityComponent,
		ActivityListManagementComponent,
		ActivityFormLayoutComponent,
		ActivityCreateComponent,
	],
	imports: [CommonModule, ActivityRoutingModule, SharedModule],
})
export class ActivityModule {}
