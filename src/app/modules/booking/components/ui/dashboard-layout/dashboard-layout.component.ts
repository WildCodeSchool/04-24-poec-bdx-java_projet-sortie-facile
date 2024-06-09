import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { FullBookingRouteEnum } from '@shared/models/enums/routes/full-routes';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { AdminService } from '@shared/services/admin.service';
import { AuthService } from '@shared/services/auth.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dashboard-layout',
	templateUrl: './dashboard-layout.component.html',
	styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() username!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	fullBookingRouteEnum = FullBookingRouteEnum;
	showDEleteBtn!: boolean;

	items: LayoutLink[] = [];
	activeItem: MenuItem | undefined;
	connectedUser!: AuthUserPrimaryDatas;
	subscription: Subscription = new Subscription();

	constructor(
		private _adminService: AdminService,
		private _authService: AuthService,
		private _activatedRoute: ActivatedRoute,
	) {}

	ngOnInit() {
		this.showDEleteBtn = 'home' === this._activatedRoute.snapshot.url[0].path;
		this.connectedUser = this._authService.getConnectedUserData();
		this.items = this._adminService.getLayoutItems();
		this.activeItem = this.items[0];
	}

	onActiveItemChange(event: MenuItem) {
		this.activeItem = event;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
