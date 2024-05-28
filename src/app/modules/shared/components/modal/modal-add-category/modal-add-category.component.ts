import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { Category } from '@shared/models/classes/category/category.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { AuthService } from '@shared/services/auth.service';
import { CategoryService } from '@shared/services/category.service';
import { UserService } from '@shared/services/user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, tap } from 'rxjs';

@Component({
	selector: 'app-modal-add-category',
	templateUrl: './modal-add-category.component.html',
	styleUrl: './modal-add-category.component.scss',
	providers: [DialogService],
})
export class ModalAddCategoryComponent implements OnInit {
	visible: boolean = false;
	categoriesList$!: Observable<Category[]>;
	selectedCategoryIds: string[] = [];

	connectedUser!: AuthUserPrimaryDatas;

	@Output() categoriesUpdated = new EventEmitter<void>();

	constructor(
		private _categoryService: CategoryService,
		private _authService: AuthService,
		private _userService: UserService,
	) {}

	ngOnInit(): void {
		this.categoriesList$ = this._categoryService.getCategoryList$();
		this.connectedUser = this._authService.getConnectedUserData();

		this._userService
			.getUserInfos$(this.connectedUser.userDetailsId)
			.pipe(
				tap(
					(userDetails: UserDetails) =>
						(this.selectedCategoryIds = userDetails.categoryIds),
				),
			)
			.subscribe();
	}

	toggleShow(): void {
		this.visible = !this.visible;
	}

	closeModal(): void {
		this.visible = false;
	}

	onSave(): void {
		this._userService
			.patchUserInfo$(this.connectedUser.userDetailsId, {
				categoryIds: this.selectedCategoryIds,
			})
			.subscribe(() => {
				this.categoriesUpdated.emit();
				this.closeModal();
			});
	}
}
