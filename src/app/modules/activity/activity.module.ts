import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityHomeComponent } from './pages/activity-home/activity-home.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityListComponent } from './pages/activity-list/activity-list.component';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component';

@NgModule({
  declarations: [ActivityHomeComponent, ActivityListComponent, ActivityDetailsComponent],
  imports: [CommonModule, ActivityRoutingModule, SharedModule],
})
export class ActivityModule {}
