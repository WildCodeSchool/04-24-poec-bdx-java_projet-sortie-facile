import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '@shared/services/contact.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalComponent {
	@Input() myForm: NgForm;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private contactService: ContactService,
	) {
		this.myForm = {} as NgForm;
	}

	onSubmit() {
		if (this.myForm && this.myForm.valid) {
			this.confirmationService.confirm({
				header: 'Confirmation',
				message: 'Comfirmer envoie du message',
				accept: () => {
					this.contactService.onSubmit(this.myForm);
					this.messageService.add({
						severity: 'info',
						summary: 'Envoyé',
						detail: 'Votre message a bien été envoyé',
						life: 3000,
					});
				},
				reject: () => {
					this.messageService.add({
						severity: 'error',
						summary: 'Refuser',
						detail: 'Vous avez refusé',
						life: 3000,
					});
				},
			});
		} else {
			this.messageService.add({
				severity: 'error',
				summary: 'Invalid Form',
				detail: 'Please fill in all required fields',
				life: 3000,
			});
		}
	}
}
