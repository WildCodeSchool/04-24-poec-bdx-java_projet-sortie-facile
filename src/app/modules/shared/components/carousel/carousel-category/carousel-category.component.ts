import { Component, Input, OnInit } from '@angular/core';
import { Category } from '@shared/models/classes/category/category.class';
import { CarouselResponsiveOption } from '@shared/models/classes/utils/carousel-responsive-option.class';

@Component({
	selector: 'app-carousel-category',
	templateUrl: './carousel-category.component.html',
	styleUrl: './carousel-category.component.scss',
})
export class CarouselCategoryComponent implements OnInit {
	@Input() categoryList!: Category[];
	@Input() numVisible!: number;
	@Input() numScroll!: number;
	@Input() circular!: boolean;
	@Input() imgSrc!: string;

	@Input() responsiveOptions!: CarouselResponsiveOption[];

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
