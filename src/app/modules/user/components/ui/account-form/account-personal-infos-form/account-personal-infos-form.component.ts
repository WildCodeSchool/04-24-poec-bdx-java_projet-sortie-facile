import { Component, OnInit } from '@angular/core';
import { UserProfilePersonalInfosForm } from '@shared/models/classes/user-details/user-details-personal-info-form.class';
import { AuthService } from '@shared/services/auth.service';
import { UserAuthCrudService } from '@shared/services/user-auth-crud.service';
import { UserService } from '@shared/services/user.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { TokenService } from '@shared/services/token.service';
import { UserProfile } from '@shared/models/classes/user-details/user-profile.class';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-account-personal-infos-form',
	templateUrl: './account-personal-infos-form.component.html',
	styleUrl: './account-personal-infos-form.component.scss',
})
export class AccountPersonalInfosFormComponent implements OnInit {
	connectedUser!: AuthUserResponse;
	userProfile$!: Observable<UserProfile>;
	isViewDatas: boolean = true;
	userPersonalInfosDatasForm!: UserProfilePersonalInfosForm;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private _userAuthCrudService: UserAuthCrudService,
		private _tokenService: TokenService,
		private messageService: MessageService,
	) {}

	ngOnInit(): void {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: AuthUserResponse) => {
				this.connectedUser = connectedUser;
			});

		this.userProfile$ = this._userService.getUserInfos$(this.connectedUser.id);
		this.userProfile$
			.pipe(
				map((UserProfile: UserProfile) => {
					this.userPersonalInfosDatasForm = {
						...UserProfile,
						email: this.connectedUser.sub,
					};
				}),
			)
			.subscribe();
	}

	showIsViewDatas(isViewDatas: boolean) {
		this.isViewDatas = isViewDatas;
	}

	onSave(): void {
		// TODO
		// CONNECT FRONT-BACK update personnal infos

		this.userProfile$ = this._userService
			.putUserInfo$(this.connectedUser.id, this.userPersonalInfosDatasForm)
			.pipe(
				tap(() => {
					this.messageService.add({
						severity: 'success',
						summary: 'Succès',
						detail: 'Les informations ont été mises à jour avec succès.',
					});
				}),
			);

		this.userProfile$.subscribe();

		// this.UserProfile$ = this._userAuthCrudService
		// 	.patchConnectedUser(
		// 		{
		// 			email: this.userPersonalInfosDatasForm.email,
		// 		},
		// 		this.connectedUser,
		// 	)
		// 	.pipe(
		// 		switchMap(() =>
		// 			this._userService
		// 				.putUserInfo$(
		// 					this.connectedUser.id,
		// 					this.userPersonalInfosDatasForm,
		// 				)
		// 				.pipe(
		// 					tap(
		// 						() =>
		// 							(this.connectedUser =
		// 								this._authService.getConnectedUserData()),
		// 					),
		// 				),
		// 		),
		// 	);

		this.isViewDatas = !this.isViewDatas;
	}
}
