import { Component, Input, OnInit } from '@angular/core';
import { Testimonial } from '@shared/models/classes/testimonial/testimonial.class';
import { CarouselResponsiveOption } from '@shared/models/classes/utils/carousel-responsive-option.class';

@Component({
	selector: 'app-carousel-testimonial',
	templateUrl: './carousel-testimonial.component.html',
	styleUrl: './carousel-testimonial.component.scss',
})
export class CarouselTestimonialComponent implements OnInit {
	@Input() testimonialList!: Testimonial[];
	@Input() numVisible!: number;
	@Input() numScroll!: number;
	@Input() circular!: boolean;

	@Input() responsiveOptions!: CarouselResponsiveOption[];

	ngOnInit() {
		this.responsiveOptions = [
			new CarouselResponsiveOption('768px', 1, 1),
			new CarouselResponsiveOption('960px', 2, 2),
			new CarouselResponsiveOption('1110px', 2, 2),
			new CarouselResponsiveOption('1920px', 3, 3),
		];
	}
}
