import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '@shared/modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from '@shared/components/form/text-field/text-field.component';
import { PasswordFieldComponent } from '@shared/components/form/password-field/password-field.component';
import { FieldErrorComponent } from '@shared/components/form/field-error/field-error.component';
import { ModalComponent } from '@shared/components/modal/modal/modal.component';
import { InputDateComponent } from '@shared/components/date/input-date/input-date.component';
import { InputHourComponent } from '@shared/components/date/input-hour/input-hour.component';
import { ButtonSocialComponent } from '@shared/components/button/button-social/button-social.component';
import { DividerComponent } from '@shared/components/divider/divider.component';
import { ButtonFormComponent } from '@shared/components/button/button-form/button-form.component';
import { AuthTypographyWithRedirectComponent } from '@shared/components/typography/auth-typography-with-redirect/auth-typography-with-redirect.component';
import { SelectCityComponent } from '@shared/components/select/select-city/select-city.component';
import { SelectCategoryComponent } from '@shared/components/select/select-category/select-category.component';
import { SelectNumberComponent } from '@shared/components/select/select-number/select-number.component';
import { AvatarPseudoComponent } from '@shared/components/avatar/avatar-pseudo/avatar-pseudo.component';
import { TextareaComponent } from '@shared/components/form/textarea/textarea.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '@shared/components/card/card.component';
import { CardLandingSmallComponent } from '@shared/components/cards/card-landing-small/card-landing-small.component';
import { CardLandingLargeComponent } from '@shared/components/cards/card-landing-large/card-landing-large.component';
import { DropzoneFieldComponent } from '@shared/components/form/dropzone-field/dropzone-field.component';
import { DateFieldComponent } from '@shared/components/form/date-field/date-field.component';
import { AccountNavActiveLinkPipe } from './pipes/account-nav-active-link/account-nav-active-link.pipe';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';

@NgModule({
	declarations: [
		AuthTypographyWithRedirectComponent,
		AvatarPseudoComponent,
		ButtonSocialComponent,
		ButtonFormComponent,
		CardComponent,
		CardLandingSmallComponent,
		CardLandingLargeComponent,
		DividerComponent,
		DropzoneFieldComponent,
		DateFieldComponent,
		FieldErrorComponent,
		InputDateComponent,
		InputHourComponent,
		ModalComponent,
		PasswordFieldComponent,
		SelectCityComponent,
		SelectCategoryComponent,
		SelectNumberComponent,
		TextareaComponent,
		TextFieldComponent,
		AccountNavActiveLinkPipe,
		SearchBarComponent,
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
		ModalComponent,
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
		CardLandingSmallComponent,
		CardLandingLargeComponent,
		DropzoneFieldComponent,
		DateFieldComponent,
		AccountNavActiveLinkPipe,
		SearchBarComponent,
	],
})
export class SharedModule {}
