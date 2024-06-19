import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddCategoryComponent } from '@shared/components/modal/modal-add-category/modal-add-category.component';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { Category } from '@shared/models/classes/category/category.class';
import { UserProfile } from '@shared/models/classes/user-details/user-profile.class';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { AccountService } from '@shared/services/account.service';
import { CategoryService } from '@shared/services/category.service';
import { TokenService } from '@shared/services/token.service';
import { UserService } from '@shared/services/user.service';
import { Observable, map, switchMap } from 'rxjs';

@Component({
	selector: 'app-account-center-of-interest-management',
	templateUrl: './account-center-of-interest-management.component.html',
	styleUrl: './account-center-of-interest-management.component.scss',
})
export class AccountCenterOfInterestManagementComponent
	extends BaseManagementComponent
	implements OnInit
{
	navItems: LayoutLink[] = [];
	categoryList$!: Observable<Category[]>;
	userCategoryList$!: Observable<Category[]>;

	@ViewChild('categoryModal') categoryModal!: ModalAddCategoryComponent;

	formDatas: {
		category: string;
	} = { category: '' };

	constructor(
		protected override _tokenService: TokenService,
		private categoryService: CategoryService,
		private _userService: UserService,
		private _accountService: AccountService,
	) {
		super(_tokenService);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.navItems = this._accountService.getLayoutItems();
		this.loadUserCategories();
	}

	loadUserCategories() {
		this.userCategoryList$ = this._userService
			.getUserInfos$(this.connectedUser.id)
			.pipe(
				map((userInfos: UserProfile) => {
					return userInfos.categoryIds;
				}),
				switchMap((categoryIds: number[]) =>
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

	onCategoryUpdated() {
		this.loadUserCategories();
	}

	onSubmit(): void {}
}
