import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '@shared/modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from '@shared/components/form/text-field/text-field.component';
import { PasswordFieldComponent } from '@shared/components/form/password-field/password-field.component';
import { FieldErrorComponent } from '@shared/components/form/field-error/field-error.component';
import { InputDateComponent } from '@shared/components/date/input-date/input-date.component';
import { InputHourComponent } from '@shared/components/date/input-hour/input-hour.component';
import { ButtonSocialComponent } from '@shared/components/button/button-social/button-social.component';
import { DividerComponent } from '@shared/components/divider/divider.component';
import { ButtonFormComponent } from '@shared/components/button/button-form/button-form.component';
import { AuthTypographyWithRedirectComponent } from '@shared/components/typography/auth-typography-with-redirect/auth-typography-with-redirect.component';
import { SelectCityComponent } from '@shared/components/select/select-city/select-city.component';
import { SelectNumberComponent } from '@shared/components/select/select-number/select-number.component';
import { AvatarPseudoComponent } from '@shared/components/avatar/avatar-pseudo/avatar-pseudo.component';
import { TextareaComponent } from '@shared/components/form/textarea/textarea.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '@shared/components/card/card.component';
import { DropzoneFieldComponent } from '@shared/components/form/dropzone-field/dropzone-field.component';
import { DateFieldComponent } from '@shared/components/form/date-field/date-field.component';
import { AccountNavActiveLinkPipe } from './pipes/account-nav-active-link/account-nav-active-link.pipe';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import { CardActivitySmallComponent } from '@shared/components/cards/card-activity-small/card-activity-small.component';
import { SelectCategoryComponent } from '@shared/components/select/select-category/select-category.component';
import { ModalConfirmReservationComponent } from './components/modal/modal-confirm-reservation/modal-confirm-reservation.component';
import { ModalConfirmCreatActivityComponent } from './components/modal/modal-confirm-creat-activity/modal-confirm-creat-activity.component';
import { ModalConfirmUpdateActivityComponent } from './components/modal/modal-confirm-update-activity/modal-confirm-update-activity.component';
import { SelectDepartmentComponent } from './components/select/select-department/select-department.component';
import { SelectRegionComponent } from './components/select/select-region/select-region.component';
import { NumberFieldComponent } from './components/form/number-field/number-field.component';
import { MaskFieldComponent } from './components/form/mask-field/mask-field.component';
import { GlobalFormErrorComponent } from './components/form/global-form-error/global-form-error.component';
import { ParagraphSplitPipe } from './pipes/paragraph-split.pipe';
import { ModalConfirmContactComponent } from './components/modal/modal-confirm-contact/modal-confirm-contact.component';

@NgModule({
	declarations: [
		AuthTypographyWithRedirectComponent,
		AvatarPseudoComponent,
		ButtonSocialComponent,
		ButtonFormComponent,
		CardComponent,
		DividerComponent,
		DropzoneFieldComponent,
		DateFieldComponent,
		FieldErrorComponent,
		InputDateComponent,
		InputHourComponent,
		ModalConfirmContactComponent,
		PasswordFieldComponent,
		SelectCityComponent,
		SelectCategoryComponent,
		SelectNumberComponent,
		TextareaComponent,
		TextFieldComponent,
		AccountNavActiveLinkPipe,
		SearchBarComponent,
		CarouselComponent,
		CardActivitySmallComponent,
		ModalConfirmReservationComponent,
		ModalConfirmCreatActivityComponent,
		ModalConfirmUpdateActivityComponent,
		SelectDepartmentComponent,
		SelectRegionComponent,
		NumberFieldComponent,
		MaskFieldComponent,
		GlobalFormErrorComponent,
		ParagraphSplitPipe,
	],
	imports: [
		CommonModule,
		PrimengModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
	exports: [
		PrimengModule,
		FormsModule,
		TextFieldComponent,
		PasswordFieldComponent,
		FieldErrorComponent,
		ModalConfirmContactComponent,
		InputDateComponent,
		InputHourComponent,
		ButtonSocialComponent,
		DividerComponent,
		ButtonFormComponent,
		AuthTypographyWithRedirectComponent,
		SelectCityComponent,
		SelectCategoryComponent,
		SelectNumberComponent,
		AvatarPseudoComponent,
		TextareaComponent,
		CardComponent,
		DropzoneFieldComponent,
		DateFieldComponent,
		AccountNavActiveLinkPipe,
		SearchBarComponent,
		CarouselComponent,
		CardActivitySmallComponent,
		ModalConfirmReservationComponent,
		ModalConfirmUpdateActivityComponent,
		ModalConfirmCreatActivityComponent,
		SelectDepartmentComponent,
		SelectRegionComponent,
		NumberFieldComponent,
		MaskFieldComponent,
		GlobalFormErrorComponent,
		ParagraphSplitPipe,
	],
})
export class SharedModule {}
