import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '@shared/services/booking.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-modal-confirm-reservation',
	templateUrl: './modal-confirm-reservation.component.html',
	styleUrl: './modal-confirm-reservation.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmReservationComponent {
	@Input() myForm: NgForm;

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private bookingService: BookingService,
		private router: Router,
	) {
		this.myForm = {} as NgForm;
	}

	onSubmit() {
		this.confirmationService.confirm({
			header: 'Confirmation',
			message: 'Comfirmer votre inscription',
			accept: () => {
				this.bookingService.onSubmit(this.myForm);
				this.messageService.add({
					severity: 'info',
					summary: 'Inscrit',
					detail: 'Votre inscription a bien été prise en compte',
					life: 3000,
				});
				setTimeout(() => {
					this.router.navigateByUrl('/user/profile');
				}, 3000); // 5000 milliseconds = 5 seconds
			},
			reject: () => {
				this.messageService.add({
					severity: 'error',
					summary: 'Abandon',
					detail: 'Abandon de votre inscription',
					life: 3000,
				});
			},
		});
	}
}
