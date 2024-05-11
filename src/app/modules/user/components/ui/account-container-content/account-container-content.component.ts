import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-account-container-content',
	templateUrl: './account-container-content.component.html',
	styleUrl: './account-container-content.component.scss',
})
export class AccountContainerContentComponent {
	@Input() sectionTitle!: string;
	isViewDatas: boolean = true;

	@Output() sendIsViewDatas: EventEmitter<boolean> =
		new EventEmitter<boolean>();

	onChangeView(): void {
		this.isViewDatas = !this.isViewDatas;
		this.sendIsViewDatas.emit(this.isViewDatas);
	}
}
