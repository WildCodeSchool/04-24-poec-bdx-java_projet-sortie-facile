import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-button-ultra-wilde',
	templateUrl: './button-ultra-wilde.component.html',
	styleUrl: './button-ultra-wilde.component.scss',
})
export class ButtonUltraWildeComponent {
	@Input() outlined!: boolean;
	@Input() label!: string;
}
