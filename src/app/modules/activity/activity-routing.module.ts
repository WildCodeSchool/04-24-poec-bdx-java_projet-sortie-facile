import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityHomeComponent } from './pages/activity-home/activity-home.component';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component';
import { ActivitySearchComponent } from './pages/activity-search/activity-search.component';

const routes: Routes = [
	// Dans le fichier account-routing.module.ts
	{ path: 'home', component: ActivityHomeComponent },
	{ path: 'list', component: ActivitySearchComponent },
	{ path: 'details/:id', component: ActivityDetailsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ActivityRoutingModule {}
