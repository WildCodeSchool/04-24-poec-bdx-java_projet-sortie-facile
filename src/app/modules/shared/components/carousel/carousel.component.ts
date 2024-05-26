import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselResponsiveOption } from '@shared/models/classes/utils/carousel-responsive-option.class';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
	@Input() activityList!: Activity[];
	@Input() numVisible!: number;
	@Input() numScroll!: number;
	@Input() circular!: boolean;
	@Input() imgSrc!: string;

	responsiveOptions!: CarouselResponsiveOption[];

	ngOnInit() {
		this.responsiveOptions = [
			new CarouselResponsiveOption('1199px', 1, 1),
			new CarouselResponsiveOption('991px', 2, 1),
		];
	}
}
