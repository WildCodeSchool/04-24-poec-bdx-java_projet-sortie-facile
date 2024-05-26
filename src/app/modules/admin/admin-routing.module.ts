import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '@admin/pages/admin-home/admin-home.component';
import { AdminRouteEnum } from '@shared/models/enums/route.enum';

const routes: Routes = [
	{ path: AdminRouteEnum.HOME, component: AdminHomeComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
