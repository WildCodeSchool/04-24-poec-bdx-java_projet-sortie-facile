import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselResponsiveOption } from '@shared/models/types/carouselResponsiveOption.type';

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
			{
				breakpoint: '1199px',
				numVisible: 1,
				numScroll: 1,
			},
			{
				breakpoint: '991px',
				numVisible: 2,
				numScroll: 1,
			},
		];
	}
}
