import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '@shared/modules/primeng.module';
import { PipeModule } from '@shared/modules/pipe.module';
import { DirectiveModule } from '@shared/modules/directive.module';
import { SharedFormModule } from '@shared/modules/shared-form.module';

import { ButtonSocialComponent } from '@shared/components/button/button-social/button-social.component';
import { DividerComponent } from '@shared/components/divider/divider.component';
import { ButtonFormComponent } from '@shared/components/button/button-form/button-form.component';
import { AuthTypographyWithRedirectComponent } from '@shared/components/typography/auth-typography-with-redirect/auth-typography-with-redirect.component';
import { AvatarPseudoComponent } from '@shared/components/avatar/avatar-pseudo/avatar-pseudo.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '@shared/components/card/card.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import { CardActivitySmallComponent } from '@shared/components/cards/card-activity-small/card-activity-small.component';
import { ModalConfirmReservationComponent } from '@shared/components/modal/modal-confirm-reservation/modal-confirm-reservation.component';
import { ModalConfirmCreatActivityComponent } from '@shared/components/modal/modal-confirm-creat-activity/modal-confirm-creat-activity.component';
import { ModalConfirmUpdateActivityComponent } from '@shared/components/modal/modal-confirm-update-activity/modal-confirm-update-activity.component';
import { DataBookingComponent } from '@shared/components/dashboard/data-booking/data-booking.component';
import { ModalConfirmContactComponent } from '@shared/components/modal/modal-confirm-contact/modal-confirm-contact.component';
import { ModalConfirmDeleteActivityComponent } from '@shared/components/modal/modal-confirm-delete-activity/modal-confirm-delete-activity.component';
import { ConfirmationService } from 'primeng/api';
import { PieBoardComponent } from './components/dashboard/pie-board/pie-board.component';
import { VerticalBoardComponent } from './components/dashboard/vertical-board/vertical-board.component';
import { MultiAxeComponent } from './components/dashboard/multi-axe/multi-axe.component';
import { DataMailComponent } from './components/dashboard/data-mail/data-mail.component';

@NgModule({
	declarations: [
		AuthTypographyWithRedirectComponent,
		AvatarPseudoComponent,
		ButtonSocialComponent,
		ButtonFormComponent,
		CardComponent,
		DividerComponent,
		ModalConfirmContactComponent,
		SearchBarComponent,
		CarouselComponent,
		CardActivitySmallComponent,
		ModalConfirmReservationComponent,
		ModalConfirmCreatActivityComponent,
		ModalConfirmUpdateActivityComponent,
		DataBookingComponent,
		ModalConfirmDeleteActivityComponent,
		PieBoardComponent,
		VerticalBoardComponent,
		MultiAxeComponent,
		DataMailComponent,
	],
	imports: [
		CommonModule,
		PrimengModule,
		PipeModule,
		DirectiveModule,
		SharedFormModule,
		HttpClientModule,
	],
	providers: [ConfirmationService],
	exports: [
		PrimengModule,
		PipeModule,
		DirectiveModule,
		SharedFormModule,
		ModalConfirmContactComponent,
		ButtonSocialComponent,
		DividerComponent,
		ButtonFormComponent,
		AuthTypographyWithRedirectComponent,
		AvatarPseudoComponent,
		CardComponent,
		SearchBarComponent,
		CarouselComponent,
		CardActivitySmallComponent,
		ModalConfirmReservationComponent,
		ModalConfirmUpdateActivityComponent,
		ModalConfirmCreatActivityComponent,
		DataBookingComponent,
		ModalConfirmDeleteActivityComponent,
		PieBoardComponent,
		VerticalBoardComponent,
		MultiAxeComponent,
		DataMailComponent,
	],
})
export class SharedModule {}
