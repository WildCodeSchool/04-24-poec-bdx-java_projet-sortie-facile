import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { MentionLegalesComponent } from './mention-legales/mention-legales.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DialogService } from 'primeng/dynamicdialog';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@shared/interceptor/token.interceptor';
import { MessageService } from 'primeng/api';

registerLocaleData(localeFr, 'fr');

@NgModule({
	declarations: [
		AppComponent,
		PagenotfoundComponent,
		HeaderComponent,
		ScrollToTopComponent,
		ContactComponent,
		FooterComponent,
		MentionLegalesComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		FormsModule,
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr' },
		DialogService,
		{
			provide: FIREBASE_OPTIONS,
			useValue: environment.firebase,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
		MessageService,
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
