import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ActivityDetailsComponent } from '@activity/pages/activity-details/activity-details.component';
import { UpdateActivityComponent } from '@activity/pages/update-activity/update-activity.component';
import { ActivityListComponent } from '@activity/pages/activity-list/activity-list.component';
import { ActivityCreateComponent } from '@activity/pages/activity-create/activity-create.component';
import { ActivityRouteEnum } from '@shared/models/enums/routes/route.enum';
import { updateActivityResolver } from '@shared/resolvers/activity/update-activity.resolver';

const routes: Routes = [
	{ path: ActivityRouteEnum.HOME, component: ActivityListComponent },
	{ path: ActivityRouteEnum.POST, component: ActivityCreateComponent },
	// { path: ActivityRouteEnum.DETAILS, component: ActivityDetailsComponent },
	{
		path: ActivityRouteEnum.UPDATE,
		component: UpdateActivityComponent,
		resolve: { activityUpdated: updateActivityResolver },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ActivityRoutingModule {}
