import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { SharedModule } from '../shared/shared.module';
import { AccountLayoutComponent } from './components/ui/account-layout/account-layout.component';
import { AccountGeneralManagementComponent } from './components/feature/account-general-management/account-general-management.component';
import { LayoutHeaderComponent } from './components/ui/layout/layout-header/layout-header.component';
import { LayoutNavComponent } from './components/ui/layout/layout-nav/layout-nav.component';
import { LayoutNavResponsiveComponent } from './components/ui/layout/layout-nav-responsive/layout-nav-responsive.component';

@NgModule({
  declarations: [UserHomeComponent, AccountLayoutComponent, AccountGeneralManagementComponent, LayoutHeaderComponent, LayoutNavComponent, LayoutNavResponsiveComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
