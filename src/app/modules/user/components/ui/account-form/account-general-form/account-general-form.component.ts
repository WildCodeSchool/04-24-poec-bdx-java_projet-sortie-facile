import { Component, OnInit } from '@angular/core';
import { UserProfile } from '@shared/models/classes/user-details/user-profile.class';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { UserProfilePersonalInfosForm } from '@shared/models/classes/user-details/user-details-personal-info-form.class';
import { UserAuthCrudService } from '@shared/services/user-auth-crud.service';
import { UserGeneralForm } from '@shared/models/classes/user-details/user-details-general-form.class';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { TokenService } from '@shared/services/token.service';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-account-general-form',
	templateUrl: './account-general-form.component.html',
	styleUrl: './account-general-form.component.scss',
	providers: [MessageService],
})
export class AccountGeneralFormComponent implements OnInit {
	connectedUser!: AuthUserResponse;
	userProfile$!: Observable<UserProfile>;
	isViewDatas: boolean = true;
	userPersonalInfosDatasForm!: UserProfilePersonalInfosForm;

	userGeneralDatasForm!: UserGeneralForm;

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
				map((userProfile: UserProfile) => {
					this.userGeneralDatasForm = {
						...userProfile,
						username: this.connectedUser.nickname,
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
		// CONNECT FRONT-BACK update nickname and description

		this.userProfile$ = this._userService
			.putUserInfo$(this.connectedUser.id, this.userGeneralDatasForm)
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

		// this.userProfile$ = this._userAuthCrudService
		// 	.patchConnectedUser(
		// 		{
		// 			username: this.userGeneralDatasForm.username,
		// 		},
		// 		this.connectedUser,
		// 	)
		// 	.pipe(
		// 		switchMap(() =>
		// 			this._userService
		// 				.putUserInfo$(this.connectedUser.id, this.userGeneralDatasForm)
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
