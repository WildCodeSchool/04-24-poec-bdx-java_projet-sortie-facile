import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
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
export class ModalConfirmCreatActivityComponent
	extends AbstractModal
	implements OnInit
{
	@Input() myForm!: NgForm;

	connectedUser!: AuthUserPrimaryDatas;

	constructor(
		private _confirmationService: ConfirmationService,
		private _messageService: MessageService,
		private _activityService: ActivityService,
		private _router: Router,
		private _authService: AuthService,
	) {
		super();
	}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
	}

	public override onSubmit() {
		if (this.myForm && this.myForm.valid) {
			this._confirmationService.confirm({
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

	protected override onReject(): void {
		this._messageService.add({
			severity: 'error',
			summary: 'Abandonné',
			detail: 'Création abandonnée',
			life: 3000,
		});
	}

	protected override onAccept(): void {
		this._activityService
			.postNewActivity$({ ...this.myForm.value, userId: this.connectedUser.id })
			.pipe(
				tap((activity: Activity) => {
					this._messageService.add({
						severity: 'info',
						summary: 'Bravo',
						detail: 'Votre activité a bien été créée',
						life: 3000,
					});
					setTimeout(() => {
						this._router.navigate([FullActivityRouteEnum.DETAILS, activity.id]);
					}, 3000);
				}),
				catchError(() => {
					this._messageService.add({
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

	protected override onError() {
		this._messageService.add({
			severity: 'error',
			summary: 'Formulaire invalide',
			detail: 'Veuillez remplir les champs obligatoires',
			life: 3000,
		});
	}
}
