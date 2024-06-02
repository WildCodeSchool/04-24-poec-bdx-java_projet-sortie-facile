import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { FullUserRouteEnum } from '@shared/models/enums/routes/full-routes';
import { BookingService } from '@shared/services/booking.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-reservation',
	templateUrl: './modal-confirm-reservation.component.html',
	styleUrl: './modal-confirm-reservation.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmReservationComponent extends AbstractModal {
	@Input() myForm: NgForm;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private bookingService: BookingService,
		private router: Router,
	) {
		super();
		this.myForm = {} as NgForm;
	}

	public override onSubmit() {
		this.confirmationService.confirm({
			header: 'Confirmation',
			message: 'Comfirmer votre inscription',
			acceptLabel: 'Oui',
			rejectLabel: 'Non',
			accept: () => this.onAccept(),
			reject: () => this.onReject(),
		});
	}

	protected override onAccept(): void {
		this.bookingService.onSubmit(this.myForm);
		this.messageService.add({
			severity: 'info',
			summary: 'Inscrit',
			detail: 'Votre inscription a bien été prise en compte',
			life: 3000,
		});
		setTimeout(() => {
			this.router.navigateByUrl(FullUserRouteEnum.ACTIVITY);
		}, 3000);
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
