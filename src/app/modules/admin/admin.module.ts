import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '@admin/admin-routing.module';
import { AdminHomeComponent } from '@admin/pages/admin-home/admin-home.component';
import { AdminMailComponent } from './pages/admin-mail/admin-mail.component';
import { AdminMailManagementComponent } from './components/feature/admin-mail-management/admin-mail-management.component';
import { SharedModule } from '@shared/shared.module';
import { AdminLayoutComponent } from './components/ui/admin-layout/admin-layout.component';
import { LayoutHeaderComponent } from './components/ui/layout/layout-header/layout-header.component';
import { LayoutNavComponent } from './components/ui/layout/layout-nav/layout-nav.component';
import { LayoutNavResponsiveComponent } from './components/ui/layout/layout-nav-responsive/layout-nav-responsive.component';

@NgModule({
	declarations: [
		AdminHomeComponent,
		AdminMailComponent,
		AdminMailManagementComponent,
		AdminLayoutComponent,
		LayoutHeaderComponent,
		LayoutNavComponent,
		LayoutNavResponsiveComponent,
	],
	imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
