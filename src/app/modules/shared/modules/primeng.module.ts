import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DragDropModule } from 'primeng/dragdrop';
import { TabMenuModule } from 'primeng/tabmenu';
import { ScrollTopModule } from 'primeng/scrolltop';
import { CarouselModule } from 'primeng/carousel';
import { StepperModule } from 'primeng/stepper';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
	exports: [
		ButtonModule,
		MenubarModule,
		InputTextModule,
		PasswordModule,
		MessageModule,
		ConfirmDialogModule,
		ToastModule,
		CalendarModule,
		FileUploadModule,
		InputTextareaModule,
		DividerModule,
		DropdownModule,
		InputNumberModule,
		ChipModule,
		CardModule,
		IconFieldModule,
		InputIconModule,
		CalendarModule,
		DragDropModule,
		TabMenuModule,
		ScrollTopModule,
		CarouselModule,
		StepperModule,
		InputMaskModule,
		MultiSelectModule,
		TableModule,
		TieredMenuModule,
	],
})
export class PrimengModule {}
