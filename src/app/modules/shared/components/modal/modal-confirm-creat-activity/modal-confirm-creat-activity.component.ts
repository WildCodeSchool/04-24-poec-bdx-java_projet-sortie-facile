import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from '@shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-creat-activity',
	templateUrl: './modal-confirm-creat-activity.component.html',
	styleUrl: './modal-confirm-creat-activity.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmCreatActivityComponent {
	@Input() myForm!: NgForm;
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
				message: 'Confirmer la création de votre activité',
				accept: () => this.onAccept(),
				reject: () => this.onReject(),
			});
		} else {
			this.onError();
		}
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
		this.activityService.postNewActivity$(this.myForm.value).subscribe(
			(activity: Activity) => {
				this.messageService.add({
					severity: 'info',
					summary: 'Bravo',
					detail: 'Votre activité a bien été créée',
					life: 3000,
				});
				setTimeout(() => {
					this.router.navigate(['/activity/details', activity.id]);
				}, 3000);
			},
			() => {
				this.messageService.add({
					severity: 'error',
					summary: 'Erreur',
					detail: "Une erreur s'est produite lors de la création de l'activité",
					life: 3000,
				});
			},
		);
	}

	private onError() {
		this.messageService.add({
			severity: 'error',
			summary: 'Formulaire invalide',
			detail: 'Veuillez remplir les champs obligatoires',
			life: 3000,
		});
	}
}
