import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from '@activity/activity-routing.module';
import { ActivityHomeComponent } from '@activity/pages/activity-home/activity-home.component';
import { ActivityListComponent } from '@activity/pages/activity-list/activity-list.component';
import { ActivityDetailsComponent } from '@activity/pages/activity-details/activity-details.component';
import { ActivityCardComponent } from '@activity/components/activity-card/activity-card.component';
import { ActivitySearchComponent } from '@activity/pages/activity-search/activity-search.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [
		ActivityHomeComponent,
		ActivityListComponent,
		ActivityDetailsComponent,
		ActivityCardComponent,
		ActivitySearchComponent,
	],
	imports: [CommonModule, ActivityRoutingModule, SharedModule],
})
export class ActivityModule {}
