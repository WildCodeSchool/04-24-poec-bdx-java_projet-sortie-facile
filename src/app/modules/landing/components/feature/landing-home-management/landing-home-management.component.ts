import { Activity } from '@activity/models/classes/activity.class';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Category } from '@shared/models/classes/category/category.class';
import { Testimonial } from '@shared/models/classes/testimonial/testimonial.class';
import { CarouselResponsiveOption } from '@shared/models/classes/utils/carousel-responsive-option.class';
import { LandingFunctioningDatas } from '@shared/models/types/utils/landing-functioning-datas.type';
import { ActivityService } from '@shared/services/activity.service';
import { CategoryService } from '@shared/services/category.service';
import { LandingHomeService } from '@shared/services/landing-home.service';
import { ScrollService } from '@shared/services/scroll.service';
import { TestimonialService } from '@shared/services/testimonial.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-landing-home-management',
	templateUrl: './landing-home-management.component.html',
	styleUrl: './landing-home-management.component.scss',
})
export class LandingHomeManagementComponent implements OnInit {
	@Input() responsiveOptions!: CarouselResponsiveOption[];

	@ViewChild('functioningBox') functioningBox!: ElementRef;

	scrollToFunctioningBox(): void {
		this.scrollService.scrollToElement(this.functioningBox.nativeElement, 500);
	}

	functionimgDatas!: LandingFunctioningDatas[];
	activityList$!: Observable<Activity[]>;
	categoryList$!: Observable<Category[]>;
	testimonialList$!: Observable<Testimonial[]>;

	constructor(
		private _landingHomeService: LandingHomeService,
		private _activityService: ActivityService,
		private _testimonialService: TestimonialService,
		private scrollService: ScrollService,
		private _categoryService: CategoryService,
	) {}

	ngOnInit(): void {
		this.functionimgDatas = this._landingHomeService.getFunctionimgDatas();
		this.testimonialList$ = this._testimonialService.getTestimonialList$();
		this.activityList$ = this._activityService.getActivityList$();
		this.categoryList$ = this._categoryService.getCategoryList$();
	}
}
