import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-activity-small',
	templateUrl: './card-activity-small.component.html',
	styleUrl: './card-activity-small.component.scss',
})
export class CardActivitySmallComponent {
	@Input() imgSrc!: string;
	@Input() imgAlt!: string;
	@Input() name!: string;
	@Input() link!: string[];
}
