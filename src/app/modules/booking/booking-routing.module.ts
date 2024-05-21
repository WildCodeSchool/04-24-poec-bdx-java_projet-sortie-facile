import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingHomeComponent } from '@booking/pages/booking-home/booking-home.component';

const routes: Routes = [{ path: 'home', component: BookingHomeComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BookingRoutingModule {}
