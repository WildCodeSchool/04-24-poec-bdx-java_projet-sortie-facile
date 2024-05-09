import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { FieldErrorComponent } from './components/form/field-error/field-error.component';
import { ModalComponent } from './components/modal/modal/modal.component';
import { InputDateComponent } from './components/date/input-date/input-date.component';
import { InputHourComponent } from './components/date/input-hour/input-hour.component';
import { ButtonSocialComponent } from './components/button/button-social/button-social.component';
import { DividerComponent } from './components/divider/divider.component';
import { ButtonFormComponent } from './components/button/button-form/button-form.component';
import { AuthTypographyWithRedirectComponent } from './components/typography/auth-typography-with-redirect/auth-typography-with-redirect.component';
import { SelectCityComponent } from './components/select/select-city/select-city.component';
import { SelectCategoryComponent } from './components/select/select-category/select-category.component';
import { SelectNumberComponent } from './components/select/select-number/select-number.component';
import { AvatarPseudoComponent } from './components/avatar/avatar-pseudo/avatar-pseudo.component';
import { TextareaComponent } from './components/form/textarea/textarea.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { CardLandingSmallComponent } from './components/cards/card-landing-small/card-landing-small.component';
import { CardLandingLargeComponent } from './components/cards/card-landing-large/card-landing-large.component';
import { DropzoneFieldComponent } from './components/form/dropzone-field/dropzone-field.component';
import { DateFieldComponent } from './components/form/date-field/date-field.component';
import { AccountNavActiveLinkPipe } from './pipes/account-nav-active-link/account-nav-active-link.pipe';

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
  ],
})
export class SharedModule {}
