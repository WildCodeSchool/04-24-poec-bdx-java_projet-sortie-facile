import { Component, OnInit } from '@angular/core';
import { Category } from '@shared/models/types/category.type';
import { UserDetails } from '@shared/models/types/user-details.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { BaseAccountManagementComponent } from '@user/directives/account-management.class';
import { Observable, map, switchMap, tap } from 'rxjs';

@Component({
	selector: 'app-account-center-of-interest-management',
	templateUrl: './account-center-of-interest-management.component.html',
	styleUrl: './account-center-of-interest-management.component.scss',
})
export class AccountCenterOfInterestManagementComponent
	extends BaseAccountManagementComponent
	implements OnInit
{
	categoryList$!: Observable<Category[]>;
	userCategoryList$!: Observable<Category[]>;

	formDatas: {
		category: string;
	} = { category: '' };

	constructor(
		protected override _authService: AuthService,
		private _activityService: ActivityService,
		private _userService: UserService,
	) {
		super(_authService);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.categoryList$ = this._activityService.getCategoryList$();
		this.userCategoryList$ = this._userService
			.getUserInfos$(this.connectedUser.userDetailsId)
			.pipe(
				map((userInfos: UserDetails) => userInfos.categoryIds),
				switchMap((categoryIds: string[]) =>
					this._activityService
						.getCategoryList$()
						.pipe(
							map(categoryList =>
								categoryList.filter((cat: Category) =>
									categoryIds.includes(cat.id),
								),
							),
						),
				),
			);
	}

	onSubmit(): void {}
}
