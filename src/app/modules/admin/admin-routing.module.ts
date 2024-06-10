import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '@admin/pages/admin-home/admin-home.component';
import { AdminRouteEnum } from '@shared/models/enums/routes/route.enum';
import { AdminMailComponent } from './pages/admin-mail/admin-mail.component';

const routes: Routes = [
	{ path: AdminRouteEnum.HOME, component: AdminHomeComponent },
	{ path: AdminRouteEnum.MAIL, component: AdminMailComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
