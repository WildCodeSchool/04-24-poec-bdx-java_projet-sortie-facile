import { Component, OnInit } from '@angular/core';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { UserDetailsPersonalInfosForm } from '@shared/models/classes/user-details/user-details-personal-info-form.class';
import { UserAuthCrudService } from '@shared/services/user-auth-crud.service';
import { UserGeneralForm } from '@shared/models/classes/user-details/user-details-general-form.class';

@Component({
	selector: 'app-account-general-form',
	templateUrl: './account-general-form.component.html',
	styleUrl: './account-general-form.component.scss',
})
export class AccountGeneralFormComponent implements OnInit {
	connectedUser!: AuthUserPrimaryDatas;
	userDetails$!: Observable<UserDetails>;
	isViewDatas: boolean = true;
	userPersonalInfosDatasForm!: UserDetailsPersonalInfosForm;

	userGeneralDatasForm!: UserGeneralForm;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private _userAuthCrudService: UserAuthCrudService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();

		this.userDetails$ = this._userService.getUserInfos$(
			this.connectedUser.userDetailsId,
		);
		this.userDetails$
			.pipe(
				map((userDetails: UserDetails) => {
					this.userGeneralDatasForm = {
						...userDetails,
						username: this.connectedUser.username,
					};
				}),
			)
			.subscribe();
	}

	showIsViewDatas(isViewDatas: boolean) {
		this.isViewDatas = isViewDatas;
	}

	onSave(): void {
		this.userDetails$ = this._userAuthCrudService
			.patchConnectedUser(
				{
					username: this.userGeneralDatasForm.username,
				},
				this.connectedUser,
			)
			.pipe(
				switchMap(() =>
					this._userService
						.putUserInfo$(
							this.connectedUser.userDetailsId,
							this.userGeneralDatasForm,
						)
						.pipe(
							tap(
								() =>
									(this.connectedUser =
										this._authService.getConnectedUserData()),
							),
						),
				),
			);
		this.isViewDatas = !this.isViewDatas;
	}
}
