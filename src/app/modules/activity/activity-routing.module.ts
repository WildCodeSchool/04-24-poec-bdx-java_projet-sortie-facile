import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityHomeComponent } from './pages/activity-home/activity-home.component';
import { ActivityListComponent } from './pages/activity-list/activity-list.component';

const routes: Routes = [
  // Dans le fichier account-routing.module.ts
  { path: 'home', component: ActivityHomeComponent },
  { path: 'list', component: ActivityListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRoutingModule {}
