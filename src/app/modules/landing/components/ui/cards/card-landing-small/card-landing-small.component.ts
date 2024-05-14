import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-landing-small',
	templateUrl: './card-landing-small.component.html',
	styleUrl: './card-landing-small.component.scss',
})
export class CardLandingSmallComponent {
	@Input() imgSrc!: string;
	@Input() imgAlt!: string;
	@Input() title!: string;
	@Input() description!: string;
	@Input() link!: string[];
	@Input() linkLabel!: string;
}
