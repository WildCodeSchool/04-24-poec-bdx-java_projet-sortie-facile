import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityHomeComponent } from './pages/activity-home/activity-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ActivityHomeComponent],
  imports: [CommonModule, ActivityRoutingModule, SharedModule],
})
export class ActivityModule {}
