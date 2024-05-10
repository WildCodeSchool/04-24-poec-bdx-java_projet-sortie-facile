import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalComponent {
	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
	) {}

	confirm() {
		this.confirmationService.confirm({
			header: 'Are you sure?',
			message: 'Please confirm to proceed.',
			accept: () => {
				this.messageService.add({
					severity: 'info',
					summary: 'Confirmed',
					detail: 'You have accepted',
					life: 3000,
				});
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
	}
}
