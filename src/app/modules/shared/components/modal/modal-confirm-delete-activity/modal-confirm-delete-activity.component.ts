import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
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
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private activityService: ActivityService,
		private router: Router,
	) {
		super();
	}

	public override onSubmit() {
		this.confirmationService.confirm({
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
		this.messageService.add({
			severity: 'error',
			summary: 'Erreur',
			detail: "Une erreur s'est produite lors de la modification de l'activité",
			life: 3000,
		});
	}

	public override onReject(): void {
		this.messageService.add({
			severity: 'error',
			summary: 'Abandon',
			detail: 'Suppression abandonnée',
			life: 3000,
		});
	}

	public override onAccept(): void {
		this.activityService
			.updateActivityVisibility(this.activityId, false)
			.subscribe(() => {
				this.activityDeleted.emit(this.activityId);
			});

		this.confirmationService.close();
		this.router.navigate([FullActivityRouteEnum.HOME]);
	}
}
