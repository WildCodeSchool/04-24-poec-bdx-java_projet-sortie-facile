import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddCategoryComponent } from '@shared/components/modal/modal-add-category/modal-add-category.component';
import { Category } from '@shared/models/classes/category/category.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { AuthService } from '@shared/services/auth.service';
import { CategoryService } from '@shared/services/category.service';
import { TokenService } from '@shared/services/token.service';
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

	@ViewChild('categoryModal') categoryModal!: ModalAddCategoryComponent;

	formDatas: {
		category: string;
	} = { category: '' };

	constructor(
		protected override _authService: AuthService,
		private categoryService: CategoryService,
		private _userService: UserService,
		protected override _tokenService: TokenService,
	) {
		super(_authService, _tokenService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.loadUserCategories();
	}

	loadUserCategories() {
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

	onCategoryUpdated() {
		this.loadUserCategories();
	}

	onSubmit(): void {}
}
