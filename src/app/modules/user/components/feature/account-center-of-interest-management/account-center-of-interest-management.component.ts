import { Component, OnInit } from '@angular/core';
import { Category } from '@shared/models/classes/category/category.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { CategoryService } from '@shared/services/category.service';
import { UserService } from '@shared/services/user.service';
import { BaseAccountManagementComponent } from '@user/directives/account-management.class';
import { Observable, map, switchMap } from 'rxjs';

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
		private categoryService: CategoryService,
		private _userService: UserService,
	) {
		super(_authService);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.categoryList$ = this.categoryService.getCategoryList$();
		this.userCategoryList$ = this._userService
			.getUserInfos$(this.connectedUser.userDetailsId)
			.pipe(
				map((userInfos: UserDetails) => userInfos.categoryIds),
				switchMap((categoryIds: string[]) =>
					this.categoryService
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
