import { Component, OnInit } from '@angular/core';
import {
	UserDetails,
	UserDetailsPersonalInfosForm,
} from '@shared/models/types/user-details.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth.service';
import { UserAuthCrudService } from '@shared/services/user-auth-crud.service';
import { UserService } from '@shared/services/user.service';
import { Observable, map, switchMap, tap } from 'rxjs';

@Component({
	selector: 'app-account-personal-infos-form',
	templateUrl: './account-personal-infos-form.component.html',
	styleUrl: './account-personal-infos-form.component.scss',
})
export class AccountPersonalInfosFormComponent implements OnInit {
	connectedUser!: UserAuthPrimaryDatas;
	userDetails$!: Observable<UserDetails>;
	isViewDatas: boolean = true;
	userPersonalInfosDatasForm!: UserDetailsPersonalInfosForm;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private _userAuthCrudService: UserAuthCrudService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		console.log(this.connectedUser);

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
