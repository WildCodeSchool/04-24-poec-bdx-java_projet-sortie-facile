import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, tap } from 'rxjs';

@Component({
	selector: 'app-modal-confirm-creat-activity',
	templateUrl: './modal-confirm-creat-activity.component.html',
	styleUrl: './modal-confirm-creat-activity.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmCreatActivityComponent implements OnInit {
	@Input() myForm!: NgForm;

	connectedUser!: AuthUserPrimaryDatas;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private activityService: ActivityService,
		private router: Router,
		private _authService: AuthService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
	}

	onSubmit() {
		if (this.myForm && this.myForm.valid) {
			this.confirmationService.confirm({
				header: 'Confirmation',
				message: 'Confirmer la création de votre activité',
				accept: () => this.onAccept(),
				reject: () => this.onReject(),
				acceptLabel: 'Oui',
				rejectLabel: 'Non',
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
		this.activityService
			.postNewActivity$({ ...this.myForm.value, userId: this.connectedUser.id })
			.pipe(
				tap((activity: Activity) => {
					this.messageService.add({
						severity: 'info',
						summary: 'Bravo',
						detail: 'Votre activité a bien été créée',
						life: 3000,
					});
					setTimeout(() => {
						this.router.navigate(['/activity/details', activity.id]);
					}, 3000);
				}),
				catchError(() => {
					this.messageService.add({
						severity: 'error',
						summary: 'Erreur',
						detail:
							"Une erreur s'est produite lors de la création de l'activité",
						life: 3000,
					});

					return [];
				}),
			)
			.subscribe();
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
