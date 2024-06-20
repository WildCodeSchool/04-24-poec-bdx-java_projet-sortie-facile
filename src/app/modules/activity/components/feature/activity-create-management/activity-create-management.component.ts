import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ModalConfirmCreatActivityComponent } from '@shared/components/modal/modal-confirm-creat-activity/modal-confirm-creat-activity.component';
import { NewActivityFormDatas } from '@shared/models/classes/activity/new-activity-form-datas.class';
import { UploadFileService } from '@shared/services/upload-file.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-activity-create-management',
	templateUrl: './activity-create-management.component.html',
	styleUrl: './activity-create-management.component.scss',
})
export class ActivityCreateManagementComponent implements OnDestroy {
	private _subscription: Subscription = new Subscription();

	@ViewChild(ModalConfirmCreatActivityComponent, { static: false })
	modalComponent!: ModalConfirmCreatActivityComponent;

	selectedFile: File | null = null;

	newActivity: NewActivityFormDatas = new NewActivityFormDatas(
		'',
		'',
		0,
		'https://le-periscope.info/wp-content/uploads/2022/07/Capture-decran-2020-03-05-a-00.20.29.png',
		'',
		'',
		0,
		'',
		1,
		1,
		1,
		1,
	);

	constructor(private _uploadFileService: UploadFileService) {
		this._subscription = this._uploadFileService.selectedFile$.subscribe(
			file => {
				this.selectedFile = file;
			},
		);
	}

	onFileSelected(file: File): void {
		this.selectedFile = file;
	}

	onSubmit(): void {
		// console.log(this.newActivity);
	}

	onModal(): void {
		this.modalComponent.onSubmit(this.selectedFile);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
