import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from '@shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-update-activity',
	templateUrl: './modal-confirm-update-activity.component.html',
	styleUrl: './modal-confirm-update-activity.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmUpdateActivityComponent {
	@Input() myForm!: NgForm;
	@Input() activityId!: string;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private activityService: ActivityService,
		private router: Router,
	) {}

	onSubmit() {
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

	private onError(): void {
		this.messageService.add({
			severity: 'error',
			summary: 'Formulaire invalide',
			detail: 'Veuillez remplir les champs obligatoires',
			life: 3000,
		});
	}

	private onReject(): void {
		this.messageService.add({
			severity: 'error',
			summary: 'Abandonné',
			detail: 'Création abandonnée',
			life: 3000,
		});
	}

	private onAccept(): void {
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
						this.router.navigate(['/activity/details', activity?.id]);
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
