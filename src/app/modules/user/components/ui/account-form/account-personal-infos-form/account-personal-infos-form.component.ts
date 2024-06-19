// import { Component, OnInit } from '@angular/core';
// import { UserProfilePersonalInfosForm } from '@shared/models/classes/user-details/user-details-personal-info-form.class';
// import { UserProfile } from '@shared/models/classes/user-details/user-details.class';
// import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
// import { AuthService } from '@shared/services/auth.service';
// import { UserAuthCrudService } from '@shared/services/user-auth-crud.service';
// import { UserService } from '@shared/services/user.service';
// import { Observable, map, switchMap, tap } from 'rxjs';

// @Component({
// 	selector: 'app-account-personal-infos-form',
// 	templateUrl: './account-personal-infos-form.component.html',
// 	styleUrl: './account-personal-infos-form.component.scss',
// })
// export class AccountPersonalInfosFormComponent implements OnInit {
// 	connectedUser!: AuthUserPrimaryDatas;
// 	UserProfile$!: Observable<UserProfile>;
// 	isViewDatas: boolean = true;
// 	userPersonalInfosDatasForm!: UserProfilePersonalInfosForm;

// 	constructor(
// 		private _authService: AuthService,
// 		private _userService: UserService,
// 		private _userAuthCrudService: UserAuthCrudService,
// 	) {}

// 	ngOnInit(): void {
// 		this.connectedUser = this._authService.getConnectedUserData();

// 		this.UserProfile$ = this._userService.getUserInfos$(
// 			this.connectedUser.UserProfileId,
// 		);
// 		this.UserProfile$
// 			.pipe(
// 				map((UserProfile: UserProfile) => {
// 					this.userPersonalInfosDatasForm = {
// 						...UserProfile,
// 						email: this.connectedUser.email,
// 					};
// 				}),
// 			)
// 			.subscribe();
// 	}

// 	showIsViewDatas(isViewDatas: boolean) {
// 		this.isViewDatas = isViewDatas;
// 	}

// 	onSave(): void {
// 		this.UserProfile$ = this._userAuthCrudService
// 			.patchConnectedUser(
// 				{
// 					email: this.userPersonalInfosDatasForm.email,
// 				},
// 				this.connectedUser,
// 			)
// 			.pipe(
// 				switchMap(() =>
// 					this._userService
// 						.putUserInfo$(
// 							this.connectedUser.UserProfileId,
// 							this.userPersonalInfosDatasForm,
// 						)
// 						.pipe(
// 							tap(
// 								() =>
// 									(this.connectedUser =
// 										this._authService.getConnectedUserData()),
// 							),
// 						),
// 				),
// 			);

// 		this.isViewDatas = !this.isViewDatas;
// 	}
// }
