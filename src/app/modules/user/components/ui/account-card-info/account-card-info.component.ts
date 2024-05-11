import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-account-card-info',
	templateUrl: './account-card-info.component.html',
	styleUrl: './account-card-info.component.scss',
})
export class AccountCardInfoComponent {
	@Input({ required: true }) title!: string;
	@Input({ required: true }) content!: string;
	@Input({ required: true }) isViewDatas!: boolean;
}
