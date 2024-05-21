import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component';
import { UpdateActivityComponent } from './pages/update-activity/update-activity.component';
import { ActivityListComponent } from './pages/activity-list/activity-list.component';
import { ActivityCreateComponent } from './pages/activity-create/activity-create.component';

const routes: Routes = [
	{ path: 'create', component: ActivityCreateComponent },
	{ path: 'home', component: ActivityListComponent },
	{ path: 'details/:id', component: ActivityDetailsComponent },
	{ path: 'update/:id', component: UpdateActivityComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ActivityRoutingModule {}
