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
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserPasswordComponent } from './pages/user-password/user-password.component';
import { UserActivitiesComponent } from './pages/user-activities/user-activities.component';
import { UserCalendarComponent } from './pages/user-calendar/user-calendar.component';
import { UserCenterOfInterestComponent } from './pages/user-center-of-interest/user-center-of-interest.component';
import { UserNotificationComponent } from './pages/user-notification/user-notification.component';

@NgModule({
  declarations: [UserHomeComponent, AccountLayoutComponent, AccountGeneralManagementComponent, LayoutHeaderComponent, LayoutNavComponent, LayoutNavResponsiveComponent, UserProfileComponent, UserPasswordComponent, UserActivitiesComponent, UserCalendarComponent, UserCenterOfInterestComponent, UserNotificationComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
