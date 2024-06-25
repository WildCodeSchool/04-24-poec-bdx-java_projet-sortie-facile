import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-layout-container-content',
	templateUrl: './layout-container-content.component.html',
	styleUrl: './layout-container-content.component.scss',
})
export class LayoutContainerContentComponent {
	@Input() sectionTitle!: string;
	@Input() isViewDatas!: boolean;
	@Input() hideBtn!: boolean;

	@Output() sendIsViewDatas: EventEmitter<boolean> = new EventEmitter<boolean>(
		this.isViewDatas,
	);

	onChangeView(): void {
		this.isViewDatas = !this.isViewDatas;
		this.sendIsViewDatas.emit(this.isViewDatas);
	}
}
