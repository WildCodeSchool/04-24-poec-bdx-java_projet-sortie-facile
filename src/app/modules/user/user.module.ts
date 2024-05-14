import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '@user/user-routing.module';
import { UserHomeComponent } from '@user/pages/user-home/user-home.component';
import { AccountLayoutComponent } from '@user/components/ui/account-layout/account-layout.component';
import { AccountGeneralManagementComponent } from '@user/components/feature/account-general-management/account-general-management.component';
import { LayoutHeaderComponent } from '@user/components/ui/layout/layout-header/layout-header.component';
import { LayoutNavComponent } from '@user/components/ui/layout/layout-nav/layout-nav.component';
import { LayoutNavResponsiveComponent } from '@user/components/ui/layout/layout-nav-responsive/layout-nav-responsive.component';
import { UserProfileComponent } from '@user/pages/user-profile/user-profile.component';
import { UserPasswordComponent } from '@user/pages/user-password/user-password.component';
import { UserActivitiesComponent } from '@user/pages/user-activities/user-activities.component';
import { UserCalendarComponent } from '@user/pages/user-calendar/user-calendar.component';
import { UserCenterOfInterestComponent } from '@user/pages/user-center-of-interest/user-center-of-interest.component';
import { UserNotificationComponent } from '@user/pages/user-notification/user-notification.component';
import { SharedModule } from '@shared/shared.module';
import { AccountProfileManagementComponent } from '@user/components/feature/account-profile-management/account-profile-management.component';
import { AccountCardInfoComponent } from '@user/components/ui/account-card-info/account-card-info.component';
import { AccountContainerContentComponent } from '@user/components/ui/account-container-content/account-container-content.component';
import { AccountActivitiesManagementComponent } from './components/feature/account-activities-management/account-activities-management.component';
import { AccountCenterOfInterestManagementComponent } from './components/feature/account-center-of-interest-management/account-center-of-interest-management.component';

@NgModule({
	declarations: [
		UserHomeComponent,
		AccountLayoutComponent,
		AccountGeneralManagementComponent,
		LayoutHeaderComponent,
		LayoutNavComponent,
		LayoutNavResponsiveComponent,
		UserProfileComponent,
		UserPasswordComponent,
		UserActivitiesComponent,
		UserCalendarComponent,
		UserCenterOfInterestComponent,
		UserNotificationComponent,
		AccountProfileManagementComponent,
		AccountContainerContentComponent,
		AccountCardInfoComponent,
		AccountActivitiesManagementComponent,
  AccountCenterOfInterestManagementComponent,
	],
	imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
