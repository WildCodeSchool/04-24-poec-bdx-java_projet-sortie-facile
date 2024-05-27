import { Component, Input } from '@angular/core';
import { AuthRedirect } from '@shared/models/types/auth/auth-redirect.type';

@Component({
	selector: 'app-auth-layout',
	templateUrl: './auth-layout.component.html',
	styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
	@Input({ required: true }) pageTitle!: string;
	@Input({ required: true }) backgroundImage!: string;
	@Input() redirect!: AuthRedirect;
}
