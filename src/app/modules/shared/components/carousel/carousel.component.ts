import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselResponsiveOption } from '@shared/models/classes/utils/carousel-responsive-option.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';

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

	fullActivityRoute = FullActivityRouteEnum;
	responsiveOptions!: CarouselResponsiveOption[];

	ngOnInit() {
		this.responsiveOptions = [
			new CarouselResponsiveOption('500px', 1, 1),
			new CarouselResponsiveOption('768px', 2, 2),
			new CarouselResponsiveOption('960px', 1, 1),
			new CarouselResponsiveOption('1110px', 2, 2),
			new CarouselResponsiveOption('1280px', 3, 3),
			new CarouselResponsiveOption('1600px', 4, 4),
			new CarouselResponsiveOption('1720px', 5, 5),
			new CarouselResponsiveOption('1920px', 6, 6),
		];
	}
}
