import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingHomeComponent } from '@landing/pages/landing-home/landing-home.component';
import { LandingRouteEnum } from '@shared/models/enums/route.enum';

const routes: Routes = [
	{
		path: LandingRouteEnum.DEFAULT,
		component: LandingHomeComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LandingRoutingModule {}
