import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-activity-form-layout',
	templateUrl: './activity-form-layout.component.html',
	styleUrl: './activity-form-layout.component.scss',
})
export class ActivityFormLayoutComponent {
	@Input({ required: true }) pageTitle!: string;
	@Input({ required: true }) backgroundImage!: string;
}
