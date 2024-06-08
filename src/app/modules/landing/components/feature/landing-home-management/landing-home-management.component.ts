import { Activity } from '@activity/models/classes/activity.class';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { Category } from '@shared/models/classes/category/category.class';
import { Testimonial } from '@shared/models/classes/testimonial/testimonial.class';
import { CarouselResponsiveOption } from '@shared/models/classes/utils/carousel-responsive-option.class';
import { LandingFunctioningDatas } from '@shared/models/types/utils/landing-functioning-datas.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
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

	connectedUser!: AuthUserPrimaryDatas;
	functionimgDatas!: LandingFunctioningDatas[];
	activityList$!: Observable<Activity[]>;
	categoryList$!: Observable<Category[]>;
	testimonialList$!: Observable<Testimonial[]>;

	constructor(
		private _authService: AuthService,
		private _landingHomeService: LandingHomeService,
		private _activityService: ActivityService,
		private _testimonialService: TestimonialService,
		private scrollService: ScrollService,
		private _categoryService: CategoryService,
		private _router: Router,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this.functionimgDatas = this._landingHomeService.getFunctionimgDatas();
		this.testimonialList$ = this._testimonialService.getTestimonialList$();
		this.activityList$ = this._activityService.getActivityList$();
		this.categoryList$ = this._categoryService.getCategoryList$();

		this._router.events.subscribe(e => {
			if (e instanceof NavigationEnd) {
				this.scrollToTop();
			}
		});
	}

	scrollToTop(): void {
		this.scrollService.scrollToElement(document.body, 500);
	}

	scrollToFunctioningBox(): void {
		this.scrollService.scrollToElement(this.functioningBox.nativeElement, 500);
	}

	logout(): void {
		this._authService.logout();
	}
}
