import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { ContactService } from '@shared/services/contact.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-contact',
	templateUrl: './modal-confirm-contact.component.html',
	styleUrl: './modal-confirm-contact.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmContactComponent extends AbstractModal {
	@Input() myForm: NgForm;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private contactService: ContactService,
		private router: Router,
	) {
		super();
		this.myForm = {} as NgForm;
	}

	public override onSubmit() {
		if (this.myForm && this.myForm.valid) {
			this.confirmationService.confirm({
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
		this.messageService.add({
			severity: 'error',
			summary: 'Invalid Form',
			detail: 'Please fill in all required fields',
			life: 3000,
		});
	}

	protected override onReject(): void {
		this.messageService.add({
			severity: 'error',
			summary: 'Refuser',
			detail: 'Vous avez refusé',
			life: 3000,
		});
	}

	protected override onAccept(): void {
		this.contactService.onSubmit(this.myForm);
		this.messageService.add({
			severity: 'info',
			summary: 'Envoyé',
			detail: 'Votre message a bien été envoyé',
			life: 3000,
		});
		setTimeout(() => {
			this.router.navigateByUrl('/');
		}, 3000);
	}
}
