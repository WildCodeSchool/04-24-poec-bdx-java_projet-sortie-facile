import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-account-container-content',
	templateUrl: './account-container-content.component.html',
	styleUrl: './account-container-content.component.scss',
})
export class AccountContainerContentComponent {
	@Input() sectionTitle!: string;
	@Input() isViewDatas!: boolean;

	@Output() sendIsViewDatas: EventEmitter<boolean> = new EventEmitter<boolean>(
		this.isViewDatas,
	);

	onChangeView(): void {
		this.isViewDatas = !this.isViewDatas;
		this.sendIsViewDatas.emit(this.isViewDatas);
	}
}
