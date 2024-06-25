import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '@user/user-routing.module';
import { UserHomeComponent } from '@user/pages/user-home/user-home.component';
import { UserProfileComponent } from '@user/pages/user-profile/user-profile.component';
import { UserPasswordComponent } from '@user/pages/user-password/user-password.component';
import { UserActivitiesComponent } from '@user/pages/user-activities/user-activities.component';
import { UserCalendarComponent } from '@user/pages/user-calendar/user-calendar.component';
import { UserCenterOfInterestComponent } from '@user/pages/user-center-of-interest/user-center-of-interest.component';
import { UserNotificationComponent } from '@user/pages/user-notification/user-notification.component';
import { SharedModule } from '@shared/shared.module';
import { AccountProfileManagementComponent } from '@user/components/feature/account-profile-management/account-profile-management.component';
import { AccountCardInfoComponent } from '@user/components/ui/account-card-info/account-card-info.component';
import { AccountActivitiesManagementComponent } from './components/feature/account-activities-management/account-activities-management.component';
import { AccountCenterOfInterestManagementComponent } from './components/feature/account-center-of-interest-management/account-center-of-interest-management.component';
import { FormsModule } from '@angular/forms';
import { AccountPersonalInfosFormComponent } from './components/ui/account-form/account-personal-infos-form/account-personal-infos-form.component';
import { AccountAddressFormComponent } from './components/ui/account-form/account-address-form/account-address-form.component';
import { AccountPasswordManagementComponent } from './components/feature/account-password-management/account-password-management.component';
import { AccountPasswordFormComponent } from './components/ui/account-form/account-password-form/account-password-form.component';
import { AccountCalendarManagementComponent } from './components/feature/account-calendar-management/account-calendar-management.component';
import { AccountCalendarComponent } from './components/ui/account-calendar/account-calendar.component';
import { AccountGeneralFormComponent } from './components/ui/account-form/account-general-form/account-general-form.component';
import { AccountGeneralManagementComponent } from './components/feature/account-general-management/account-general-management.component';
import { AccountNotifManagementComponent } from './components/feature/account-notif-management/account-notif-management.component';
import { UserBookingComponent } from './pages/user-booking/user-booking.component';
import { AccountBookingManagementComponent } from './components/feature/account-booking-management/account-booking-management.component';

@NgModule({
	declarations: [
		UserHomeComponent,
		AccountGeneralManagementComponent,
		UserProfileComponent,
		UserPasswordComponent,
		UserActivitiesComponent,
		UserCalendarComponent,
		UserCenterOfInterestComponent,
		UserNotificationComponent,
		AccountProfileManagementComponent,
		AccountCardInfoComponent,
		AccountActivitiesManagementComponent,
		AccountCenterOfInterestManagementComponent,
		AccountPersonalInfosFormComponent,
		AccountAddressFormComponent,
		AccountPasswordManagementComponent,
		AccountPasswordFormComponent,
		AccountCalendarManagementComponent,
		AccountCalendarComponent,
		AccountGeneralFormComponent,
		AccountNotifManagementComponent,
		UserBookingComponent,
		AccountBookingManagementComponent,
	],
	imports: [CommonModule, UserRoutingModule, SharedModule, FormsModule],
})
export class UserModule {}
