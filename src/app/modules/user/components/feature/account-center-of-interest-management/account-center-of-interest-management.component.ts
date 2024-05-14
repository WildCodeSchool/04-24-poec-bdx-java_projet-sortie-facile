import { Component, Input, OnInit } from '@angular/core';
import { Category } from '@shared/models/types/category.type';
import { UserDetails } from '@shared/models/types/user-details.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { Observable, map, switchMap } from 'rxjs';

@Component({
	selector: 'app-account-center-of-interest-management',
	templateUrl: './account-center-of-interest-management.component.html',
	styleUrl: './account-center-of-interest-management.component.scss',
})
export class AccountCenterOfInterestManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: UserAuthPrimaryDatas;
	categoryList$!: Observable<Category[]>;
	userCategoryList$!: Observable<Category[]>;

	constructor(
		private _authService: AuthService,
		private _activityService: ActivityService,
		private _userService: UserService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this.categoryList$ = this._activityService.getCategoryList$();
		this.userCategoryList$ = this._userService
			.getUserInfos$(this.connectedUser.id)
			.pipe(
				map((userInfos: UserDetails) => userInfos.categorieIds),
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
}
