import { Activity } from '@activity/models/classes/activity.class';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LandingFunctioningDatas } from '@shared/models/types/utils/landing-functioning-datas.type';
import { ActivityService } from '@shared/services/activity.service';
import { LandingHomeService } from '@shared/services/landing-home.service';
import { Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-landing-home-management',
	templateUrl: './landing-home-management.component.html',
	styleUrl: './landing-home-management.component.scss',
})
export class LandingHomeManagementComponent implements OnInit, OnDestroy {
	functionimgDatas!: LandingFunctioningDatas[];
	activityList: Activity[] = [];

	private _subscription: Subscription = new Subscription();

	constructor(
		private _landingHomeService: LandingHomeService,
		private _activityService: ActivityService,
	) {}
	ngOnInit(): void {
		this.functionimgDatas = this._landingHomeService.getFunctionimgDatas();

		this._subscription.add(
			this._activityService
				.getActivityList$()
				.pipe(
					tap(activities => {
						this.activityList = activities;
					}),
				)
				.subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
