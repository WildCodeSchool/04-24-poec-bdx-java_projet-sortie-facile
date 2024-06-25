import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.scss',
})
export class AlertComponent {
	@Input() icon!: string;
	@Input() message!: string;
	@Input() error!: boolean;
}
