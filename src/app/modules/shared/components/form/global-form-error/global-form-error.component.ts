import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-global-form-error',
	templateUrl: './global-form-error.component.html',
	styleUrl: './global-form-error.component.scss',
})
export class GlobalFormErrorComponent {
	@Input({ required: true }) errorMessage!: string;
}
