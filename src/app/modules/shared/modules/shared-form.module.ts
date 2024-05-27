import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from '@shared/components/form/field-error/field-error.component';
import { InputDateComponent } from '@shared/components/date/input-date/input-date.component';
import { InputHourComponent } from '@shared/components/date/input-hour/input-hour.component';
import { DateFieldComponent } from '@shared/components/form/date-field/date-field.component';
import { PasswordFieldComponent } from '@shared/components/form/password-field/password-field.component';
import { SelectCityComponent } from '@shared/components/select/select-city/select-city.component';
import { SelectCategoryComponent } from '@shared/components/select/select-category/select-category.component';
import { DropzoneFieldComponent } from '@shared/components/form/dropzone-field/dropzone-field.component';
import { GlobalFormErrorComponent } from '@shared/components/form/global-form-error/global-form-error.component';
import { MaskFieldComponent } from '@shared/components/form/mask-field/mask-field.component';
import { NumberFieldComponent } from '@shared/components/form/number-field/number-field.component';
import { TextFieldComponent } from '@shared/components/form/text-field/text-field.component';
import { TextareaComponent } from '@shared/components/form/textarea/textarea.component';
import { SelectDepartmentComponent } from '@shared/components/select/select-department/select-department.component';
import { SelectNumberComponent } from '@shared/components/select/select-number/select-number.component';
import { SelectRegionComponent } from '@shared/components/select/select-region/select-region.component';
import { PrimengModule } from './primeng.module';

@NgModule({
	declarations: [
		FieldErrorComponent,
		InputDateComponent,
		InputHourComponent,
		DateFieldComponent,
		PasswordFieldComponent,
		SelectCityComponent,
		SelectCategoryComponent,
		SelectNumberComponent,
		TextareaComponent,
		TextFieldComponent,
		SelectDepartmentComponent,
		SelectRegionComponent,
		NumberFieldComponent,
		MaskFieldComponent,
		GlobalFormErrorComponent,
		DropzoneFieldComponent,
	],
	imports: [CommonModule, PrimengModule, FormsModule, ReactiveFormsModule],
	exports: [
		FieldErrorComponent,
		InputDateComponent,
		InputHourComponent,
		DateFieldComponent,
		PasswordFieldComponent,
		SelectCityComponent,
		SelectCategoryComponent,
		SelectNumberComponent,
		TextareaComponent,
		TextFieldComponent,
		SelectDepartmentComponent,
		SelectRegionComponent,
		NumberFieldComponent,
		MaskFieldComponent,
		GlobalFormErrorComponent,
		DropzoneFieldComponent,
	],
})
export class SharedFormModule {}
