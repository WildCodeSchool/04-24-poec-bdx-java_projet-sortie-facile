import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import {
	FullActivityRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';
import { ActivityService } from '@shared/services/activity.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-delete-activity',
	templateUrl: './modal-confirm-delete-activity.component.html',
	styleUrl: './modal-confirm-delete-activity.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmDeleteActivityComponent extends AbstractModal {
	@Input() activityId!: string;
	@Output() activityDeleted = new EventEmitter<string>();

	constructor(
		private _confirmationService: ConfirmationService,
		private _messageService: MessageService,
		private _activityService: ActivityService,
		private _router: Router,
	) {
		super();
	}

	public override onSubmit() {
		this._confirmationService.confirm({
			message: 'Êtes-vous sûr de vouloir masquer cette activité ?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => this.onAccept(),
			reject: () => this.onReject(),
			acceptLabel: 'Oui',
			rejectLabel: 'Non',
		});
	}

	public override onError(): void {
		this._messageService.add({
			severity: 'error',
			summary: 'Erreur',
			detail: "Une erreur s'est produite lors de la modification de l'activité",
			life: 3000,
		});
	}

	public override onReject(): void {
		this._messageService.add({
			severity: 'error',
			summary: 'Abandon',
			detail: 'Suppression abandonnée',
			life: 3000,
		});
	}

	public override onAccept(): void {
		this._activityService
			.updateActivityVisibility(this.activityId, false)
			.subscribe(() => {
				this.activityDeleted.emit(this.activityId);
				this._confirmationService.close();
				this._router.navigate([FullUserRouteEnum.ACTIVITY]);
			});
	}
}
