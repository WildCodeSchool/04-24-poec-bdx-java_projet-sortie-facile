import { Component, OnInit } from '@angular/core';
import { UserDetailsPersonalInfosForm } from '@shared/models/classes/user-details/user-details-personal-info-form.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { UserAuthCrudService } from '@shared/services/user-auth-crud.service';
import { UserService } from '@shared/services/user.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { TokenService } from '@shared/services/token.service';

@Component({
	selector: 'app-account-personal-infos-form',
	templateUrl: './account-personal-infos-form.component.html',
	styleUrl: './account-personal-infos-form.component.scss',
})
export class AccountPersonalInfosFormComponent implements OnInit {
	connectedUser!: AuthUserPrimaryDatas;
	userDetails$!: Observable<UserDetails>;
	isViewDatas: boolean = true;
	userPersonalInfosDatasForm!: UserDetailsPersonalInfosForm;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private _userAuthCrudService: UserAuthCrudService,
		protected _tokenService: TokenService,
	) {}

	ngOnInit(): void {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: any) => {
				console.log(connectedUser);

				this.connectedUser = connectedUser;
			});

		this.userDetails$ = this._userService.getUserInfos$(
			this.connectedUser.userDetailsId,
		);
		this.userDetails$
			.pipe(
				map((userDetails: UserDetails) => {
					this.userPersonalInfosDatasForm = {
						...userDetails,
						email: this.connectedUser.email,
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
					email: this.userPersonalInfosDatasForm.email,
				},
				this.connectedUser,
			)
			.pipe(
				switchMap(() =>
					this._userService
						.putUserInfo$(
							this.connectedUser.userDetailsId,
							this.userPersonalInfosDatasForm,
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
