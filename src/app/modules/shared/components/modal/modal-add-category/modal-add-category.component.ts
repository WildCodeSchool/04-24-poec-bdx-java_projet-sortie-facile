import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { Category } from '@shared/models/classes/category/category.class';
import { UserProfile } from '@shared/models/classes/user-details/user-profile.class';
import { CategoryService } from '@shared/services/category.service';
import { TokenService } from '@shared/services/token.service';
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
	selectedCategoryIds: number[] = [];

	connectedUser!: AuthUserResponse;

	@Output() categoriesUpdated = new EventEmitter<void>();

	constructor(
		private _categoryService: CategoryService,
		private _userService: UserService,
		private _tokenService: TokenService,
	) {}

	ngOnInit(): void {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: AuthUserResponse) => {
				this.connectedUser = connectedUser;
			});

		this.categoriesList$ = this._categoryService.getCategoryList$();

		this._userService
			.getUserInfos$(this.connectedUser.id)
			.pipe(
				tap(
					(userProfile: UserProfile) =>
						(this.selectedCategoryIds = userProfile.categoryIds),
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
			.putUserCategories$(this.connectedUser.id, this.selectedCategoryIds)
			.subscribe(() => {
				this.categoriesUpdated.emit();
				this.closeModal();
			});
	}
}
