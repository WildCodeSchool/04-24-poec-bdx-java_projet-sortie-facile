import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from '@booking/booking-routing.module';
import { BookingHomeComponent } from '@booking/pages/booking-home/booking-home.component';

@NgModule({
	declarations: [BookingHomeComponent],
	imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
