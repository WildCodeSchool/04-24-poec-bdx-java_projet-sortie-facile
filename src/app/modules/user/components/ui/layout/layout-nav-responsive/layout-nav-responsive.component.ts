import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@shared/services/account.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-layout-nav-responsive',
	templateUrl: './layout-nav-responsive.component.html',
	styleUrl: './layout-nav-responsive.component.scss',
})
export class LayoutNavResponsiveComponent implements OnInit {
	items!: MenuItem[];
	activeItem!: MenuItem;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _accountService: AccountService,
	) {}

	ngOnInit() {
		this.items = this._accountService.getNavItems();
		this.activeItem = this._setActiveItem(this.items);
	}

	onActiveItemChange(event: MenuItem) {
		this.activeItem = event;
	}

	private _setActiveItem(items: MenuItem[]): MenuItem {
		const url: string = '/user/' + this._activatedRoute.snapshot.url[0].path;

		const activeItemIndex: number = Number(
			items.find(item => item.state?.['path'] === url)?.id,
		);

		return items[activeItemIndex - 1];
	}
}
