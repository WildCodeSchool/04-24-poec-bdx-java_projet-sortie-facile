import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { ProfileAccountComponent } from '@authentication/pages/profile-account/profile-account.component';
import { CreateAccountComponent } from '@authentication/pages/create-account/create-account.component';
import { SharedModule } from '@shared/shared.module';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
	declarations: [
		AppComponent,
		PagenotfoundComponent,
		HeaderComponent,
		CreateAccountComponent,
		ProfileAccountComponent,
		ScrollToTopComponent,
		ContactComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
