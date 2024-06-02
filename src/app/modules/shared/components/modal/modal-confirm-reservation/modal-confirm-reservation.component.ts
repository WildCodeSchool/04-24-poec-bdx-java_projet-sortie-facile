import { Component, Input } from '@angular/core';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { BookingService } from '@shared/services/booking.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-reservation',
	templateUrl: './modal-confirm-reservation.component.html',
	styleUrl: './modal-confirm-reservation.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmReservationComponent extends AbstractModal {
	@Input() userId!: string;
	@Input() activityId!: string;
	@Input() hasBooking!: boolean;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private bookingService: BookingService,
	) {
		super();
	}

	public override onSubmit() {
		this.confirmationService.confirm({
			header: 'Confirmation',
			message: this.hasBooking
				? 'Comfirmer votre désinscription à cette activité'
				: 'Comfirmer votre inscription',
			acceptLabel: 'Oui',
			rejectLabel: 'Non',
			accept: () => this.onAccept(),
			reject: () => this.onReject(),
		});
	}

	protected override onAccept(): void {
		this.bookingService
			.postNewBooking$(this.userId, this.activityId)
			.subscribe(() => {
				this.messageService.add({
					severity: 'info',
					summary: 'Inscrit',
					detail: 'Votre inscription a bien été prise en compte',
					life: 3000,
				});
			});
	}

	protected override onReject(): void {
		this.messageService.add({
			severity: 'error',
			summary: 'Abandon',
			detail: 'Abandon de votre inscription',
			life: 3000,
		});
	}

	protected override onError() {}
}
