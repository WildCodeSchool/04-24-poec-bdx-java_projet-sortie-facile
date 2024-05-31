import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { ActivityService } from '@shared/services/activity.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-update-activity',
	templateUrl: './modal-confirm-update-activity.component.html',
	styleUrl: './modal-confirm-update-activity.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmUpdateActivityComponent extends AbstractModal {
	@Input() myForm!: NgForm;
	@Input() activityId!: string;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private activityService: ActivityService,
		private router: Router,
	) {
		super();
	}

	public override onSubmit() {
		if (this.myForm && this.myForm.valid) {
			this.confirmationService.confirm({
				header: 'Confirmation',
				message: 'Confirmer la modification de votre activité',
				accept: () => this.onAccept(),
				reject: () => this.onReject(),
				acceptLabel: 'Oui',
				rejectLabel: 'Non',
			});
		} else {
			this.onError();
		}
	}

	public override onError(): void {
		this.messageService.add({
			severity: 'error',
			summary: 'Formulaire invalide',
			detail: 'Veuillez remplir les champs obligatoires',
			life: 3000,
		});
	}

	public override onReject(): void {
		this.messageService.add({
			severity: 'error',
			summary: 'Abandonné',
			detail: 'Création abandonnée',
			life: 3000,
		});
	}

	public override onAccept(): void {
		const updatedData = this.myForm.value;
		this.activityService
			.updateActivity$(this.activityId, updatedData)
			.subscribe(
				(activity: Activity) => {
					this.messageService.add({
						severity: 'success',
						summary: 'Bravo',
						detail: 'Votre activité a bien été modifié',
						life: 3000,
					});
					setTimeout(() => {
						this.router.navigate([FullActivityRouteEnum.DETAILS, activity?.id]);
					}, 3000);
				},
				() => {
					this.messageService.add({
						severity: 'error',
						summary: 'Erreur',
						detail:
							"Une erreur s'est produite lors de la modification de l'activité",
						life: 3000,
					});
				},
			);
	}
}
