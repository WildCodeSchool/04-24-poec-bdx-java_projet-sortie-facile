import { Component, Input, OnInit } from '@angular/core';
import {
	UserDetails,
	UserDetailsForm,
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
	isViewDatas: boolean = true;
	userDatasForm!: UserDetailsForm;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this.userDetails$ = this._userService.getUserInfos$(this.connectedUser.id);
		this.userDetails$
			.pipe(
				map(
					(userDetails: UserDetails) =>
						(this.userDatasForm = {
							...userDetails,
							email: this.connectedUser.email,
						}),
				),
			)
			.subscribe();
	}

	fn(isViewDatas: boolean) {
		this.isViewDatas = isViewDatas;
	}

	onSavePersonnalInfo(): void {
		this.userDetails$ = this._authService
			.patchConnectedUser({
				email: this.userDatasForm.email,
			})
			.pipe(
				switchMap(() =>
					this._userService
						.putUserInfo$(this.connectedUser.id, this.userDatasForm)
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
