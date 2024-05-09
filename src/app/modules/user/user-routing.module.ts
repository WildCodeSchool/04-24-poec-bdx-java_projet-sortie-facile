import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserPasswordComponent } from './pages/user-password/user-password.component';
import { UserCenterOfInterestComponent } from './pages/user-center-of-interest/user-center-of-interest.component';
import { UserNotificationComponent } from './pages/user-notification/user-notification.component';
import { UserActivitiesComponent } from './pages/user-activities/user-activities.component';
import { UserCalendarComponent } from './pages/user-calendar/user-calendar.component';

const routes: Routes = [
  { path: 'home', component: UserHomeComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'password', component: UserPasswordComponent },
  { path: 'center-of-interests', component: UserCenterOfInterestComponent },
  { path: 'notification', component: UserNotificationComponent },
  { path: 'activities', component: UserActivitiesComponent },
  { path: 'calendar', component: UserCalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
