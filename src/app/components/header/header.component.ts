import { Component, OnInit } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import {
	FullAdminRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';
import { UserRoleEnum } from '@shared/models/enums/user-role.enum';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { ContactService } from '@shared/services/contact.service';
import { HeaderService } from '@shared/services/header.service';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, map } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	fullAdminRouteEnum = FullAdminRouteEnum;
	fullUserRouteEnum = FullUserRouteEnum;
	profileItems$!: Observable<MenuItem[]>;
	items$!: Observable<MenuItem[]>;
	isUserLoggedIn: boolean = false;
	isAdmin: boolean = false;
	newMail: boolean = false;
	newActivity: boolean = false;

	private subscriptions = new Subscription();
	constructor(
		private _authService: AuthService,
		private _headerService: HeaderService,
		private contactService: ContactService,
		private activityService: ActivityService,
	) {}

	ngOnInit() {
		this._authService.checkIfUserIsConnectedAndNotifyLoggedInStatus();
		this.items$ = this._headerService.getPrimaryItems$();
		this.profileItems$ = this._headerService.getIsLoggedInItems$();
		this._authService
			.getConnectedUserObservable()
			.pipe(
				map((user: AuthUserPrimaryDatas) => user.role === UserRoleEnum.ADMIN),
			)
			.subscribe((isAdmin: boolean) => {
				this.isAdmin = isAdmin;
			});

		this.contactService.newMail$.subscribe((newMail: boolean) => {
			this.newMail = newMail;
		});
		this.subscriptions.add(
			this.activityService.newActivity$.subscribe((newActivity: boolean) => {
				this.newActivity = newActivity;
			}),
		);
	}
}
