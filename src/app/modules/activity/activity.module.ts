import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityHomeComponent } from './pages/activity-home/activity-home.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityListComponent } from './pages/activity-list/activity-list.component';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { ActivitySearchComponent } from './pages/activity-search/activity-search.component';

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
