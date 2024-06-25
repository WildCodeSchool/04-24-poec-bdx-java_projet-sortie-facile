import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { BookingService } from '@shared/services/booking.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-modal-confirm-reservation',
	templateUrl: './modal-confirm-reservation.component.html',
	styleUrl: './modal-confirm-reservation.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmReservationComponent
	extends AbstractModal
	implements OnDestroy
{
	@Input() profileId!: number;
	@Input() activityId!: number;
	@Input() hasBooking!: boolean;

	private _addBookingSubscription: Subscription = new Subscription();
	private _deleteBookingSubscription: Subscription = new Subscription();

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
				: 'Confirmer votre inscription',
			acceptLabel: 'Oui',
			rejectLabel: 'Non',
			accept: () => this.onAccept(),
			reject: () => this.onReject(),
		});
	}

	protected override onAccept(): void {
		this.hasBooking ? this.deleteNewBooking() : this.postNewBooking();
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

	private postNewBooking(): void {
		this._addBookingSubscription.add(
			this.bookingService
				.postNewBooking$(this.profileId, this.activityId)
				.subscribe(() => {
					this.messageService.add({
						severity: 'info',
						summary: 'Inscrit',
						detail: 'Votre inscription a bien été prise en compte',
						life: 3000,
					});
				}),
		);
	}

	private deleteNewBooking(): void {
		this._deleteBookingSubscription.add(
			this.bookingService
				.deleteBookingById$(this.profileId, this.activityId)
				.subscribe(() => {
					this.messageService.add({
						severity: 'info',
						summary: 'Désinscrit',
						detail: 'Votre désinscription a bien été prise en compte',
						life: 3000,
					});
				}),
		);
	}

	ngOnDestroy(): void {
		this._addBookingSubscription.unsubscribe();
		this._deleteBookingSubscription.unsubscribe();
	}
}
