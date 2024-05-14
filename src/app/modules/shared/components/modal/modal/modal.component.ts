import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '@shared/services/contact/contact.service';
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
		this.myForm = {} as NgForm; // Initialiser myForm dans le constructeur
	}

	onSubmit() {
		if (this.myForm && this.myForm.valid) {
			// Vérifiez que 'form' est bien défini et valide
			this.confirmationService.confirm({
				header: 'Are you sure?',
				message: 'Please confirm to proceed.',
				accept: () => {
					this.contactService.onSubmit(this.myForm);
					console.log(this.myForm);
					// this.messageService.add({
					// 	severity: 'info',
					// 	summary: 'Confirmed',
					// 	detail: 'You have accepted',
					// 	life: 3000,
					// });
				},
				reject: () => {
					this.messageService.add({
						severity: 'error',
						summary: 'Rejected',
						detail: 'You have rejected',
						life: 3000,
					});
				},
			});
		} else {
			// Gérer le cas où le formulaire n'est pas valide
			this.messageService.add({
				severity: 'error',
				summary: 'Invalid Form',
				detail: 'Please fill in all required fields',
				life: 3000,
			});
		}
	}
}
