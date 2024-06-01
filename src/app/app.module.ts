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
	providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
