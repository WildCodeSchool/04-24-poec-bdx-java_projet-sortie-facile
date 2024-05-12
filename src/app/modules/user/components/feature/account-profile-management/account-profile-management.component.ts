import { Component, Input, OnInit } from '@angular/core';
import {
	UserDetails,
	UserDetailsAddressForm,
	UserDetailsPersonalInfosForm,
} from '@shared/models/types/user-details.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { Observable, map, switchMap, tap } from 'rxjs';

@Component({
	selector: 'app-account-profile-management',
	templateUrl: './account-profile-management.component.html',
	styleUrl: './account-profile-management.component.scss',
})
export class AccountProfileManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: UserAuthPrimaryDatas;
	userDetails$!: Observable<UserDetails>;
	isViewPersonalInfosDatas: boolean = true;
	isViewAddressDatas: boolean = true;
	userPersonalInfosDatasForm!: UserDetailsPersonalInfosForm;
	userAddressDatasForm!: UserDetailsAddressForm;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this.userDetails$ = this._userService.getUserInfos$(this.connectedUser.id);
		this.userDetails$
			.pipe(
				map((userDetails: UserDetails) => {
					this.userPersonalInfosDatasForm = {
						...userDetails,
						email: this.connectedUser.email,
					};
					this.userAddressDatasForm = {
						...userDetails,
						email: this.connectedUser.email,
					};
				}),
			)
			.subscribe();
	}

	showPersonalInfosDatas(isViewDatas: boolean) {
		this.isViewPersonalInfosDatas = isViewDatas;
	}

	showAddressDatas(isViewDatas: boolean) {
		this.isViewAddressDatas = isViewDatas;
	}

	onSavePersonnalInfo(): void {
		this.userDetails$ = this._authService
			.patchConnectedUser({
				email: this.userPersonalInfosDatasForm.email,
			})
			.pipe(
				switchMap(() =>
					this._userService
						.putUserInfo$(
							this.connectedUser.id,
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

		this.isViewPersonalInfosDatas = !this.isViewPersonalInfosDatas;
	}

	onSaveAddress(): void {
		this.userDetails$ = this._userService.patchUserInfo$(
			this.connectedUser.id,
			this.userAddressDatasForm,
		);

		this.isViewAddressDatas = !this.isViewAddressDatas;
	}
}
