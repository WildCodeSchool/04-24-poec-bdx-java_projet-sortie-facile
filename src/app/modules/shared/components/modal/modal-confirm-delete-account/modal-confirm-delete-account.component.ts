import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { FullAuthenticationRouteEnum } from '@shared/models/enums/routes/full-routes';
import { AuthService } from '@shared/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';

@Component({
	selector: 'app-modal-confirm-delete-account',
	templateUrl: './modal-confirm-delete-account.component.html',
	styleUrl: './modal-confirm-delete-account.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalDeleteAccountComponent extends AbstractModal {
	@Input() connectedUser!: AuthUserPrimaryDatas;

	constructor(
		private _confirmationService: ConfirmationService,
		private _messageService: MessageService,
		private _authService: AuthService,
		private _router: Router,
	) {
		super();
	}

	public override onSubmit() {
		this._confirmationService.confirm({
			message:
				'Êtes-vous sûr de vouloir supprimer votre compte ? Attention cette action est définitive.',
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
			detail:
				"Une erreur s'est produite lors de la suppression de de votre compte",
			life: 3000,
		});
	}

	public override onReject(): void {
		this._messageService.add({
			severity: 'error',
			summary: 'Abandon',
			detail: 'Suppression de votre compte abandonnée',
			life: 3000,
		});
	}

	public override onAccept(): void {
		this._authService
			.deleteUser(this.connectedUser.id)
			.pipe(
				tap(() => {
					this._confirmationService.close();
					this._router.navigate([FullAuthenticationRouteEnum.LOGIN]);
				}),
			)
			.subscribe();
	}
}
