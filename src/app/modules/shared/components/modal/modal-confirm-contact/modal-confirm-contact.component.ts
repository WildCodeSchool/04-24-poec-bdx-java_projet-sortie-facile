import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-contact',
	templateUrl: './modal-confirm-contact.component.html',
	styleUrls: ['./modal-confirm-contact.component.scss'],
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmContactComponent extends AbstractModal {
	@Input() myForm: NgForm;
	@Output() submitConfirmed = new EventEmitter<any>();
	constructor(
		private _confirmationService: ConfirmationService,
		private _messageService: MessageService,
	) {
		super();
		this.myForm = {} as NgForm;
	}

	public override onSubmit() {
		if (this.myForm && this.myForm.valid) {
			this._confirmationService.confirm({
				header: 'Confirmation',
				message: "Confirmer l'envoie du message",
				accept: () => this.onAccept(),
				reject: () => this.onReject(),
				acceptLabel: 'Oui',
				rejectLabel: 'Non',
			});
		} else {
			this.onError();
		}
	}

	protected override onError(): void {
		this._messageService.add({
			severity: 'error',
			summary: 'Invalid Form',
			detail: 'Please fill in all required fields',
			life: 3000,
		});
	}

	protected override onReject(): void {
		this._messageService.add({
			severity: 'error',
			summary: 'Refuser',
			detail: 'Vous avez refusé',
			life: 3000,
		});
	}

	protected override onAccept(): void {
		// Ne pas appeler directement _contactService.onSubmit(this.myForm);
		// Émettre un événement pour que ContactComponent puisse gérer la soumission
		this.submitConfirmed.emit(this.myForm.value);
	}
}
