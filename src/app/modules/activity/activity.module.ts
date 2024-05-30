import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from '@activity/activity-routing.module';
import { ActivityListComponent } from '@activity/pages/activity-list/activity-list.component';
import { ActivityDetailsComponent } from '@activity/pages/activity-details/activity-details.component';
import { ActivityCardComponent } from '@activity/components/ui/activity-card/activity-card.component';
import { SharedModule } from '@shared/shared.module';
import { UpdateActivityComponent } from '@activity/pages/update-activity/update-activity.component';
import { ActivityListManagementComponent } from '@activity/components/feature/activity-list-management/activity-list-management.component';
import { ActivityCreateManagementComponent } from '@activity/components/feature/activity-create-management/activity-create-management.component';
import { ActivityCreateComponent } from '@activity/pages/activity-create/activity-create.component';
import { ActivityUpdateManagementComponent } from '@activity/components/feature/activity-update-management/activity-update-management.component';

@NgModule({
	declarations: [
		ActivityCreateManagementComponent,
		ActivityListComponent,
		ActivityDetailsComponent,
		ActivityCardComponent,
		UpdateActivityComponent,
		ActivityListManagementComponent,
		ActivityCreateComponent,
		ActivityUpdateManagementComponent,
	],
	imports: [CommonModule, ActivityRoutingModule, SharedModule],
})
export class ActivityModule {}
