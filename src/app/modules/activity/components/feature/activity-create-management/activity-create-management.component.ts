import { NewActivity } from '@activity/models/classes/new-activity.class';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ModalConfirmCreatActivityComponent } from '@shared/components/modal/modal-confirm-creat-activity/modal-confirm-creat-activity.component';
import { City } from '@shared/models/classes/address/city.class';
import { Category } from '@shared/models/classes/category/category.class';
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

	newActivity: NewActivity = new NewActivity(
		'toto',
		'',
		new City(0, ''),
		'',
		0,
		'',
		'',
		'',
		0,
		new Category('', '', ''),
		'',
		'',
		true,
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
