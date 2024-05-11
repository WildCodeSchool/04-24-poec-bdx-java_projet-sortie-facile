import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-account-container-content',
	templateUrl: './account-container-content.component.html',
	styleUrl: './account-container-content.component.scss',
})
export class AccountContainerContentComponent {
	@Input() sectionTitle!: string;
	isViewDatas: boolean = true;

	onChangeView(): void {
		this.isViewDatas = !this.isViewDatas;
	}
}
