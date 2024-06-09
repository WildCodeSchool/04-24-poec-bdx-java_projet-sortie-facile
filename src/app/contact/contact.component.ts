import { Activity } from '@activity/models/classes/activity.class';
import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalConfirmContactComponent } from '@shared/components/modal/modal-confirm-contact/modal-confirm-contact.component';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { ContactService } from '@shared/services/contact.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnDestroy, OnInit {
	@Input() activity!: Activity;
	@Input() connectedUser!: AuthUserPrimaryDatas;
	@Output() messageSent = new EventEmitter<void>();

	private _subscription: Subscription = new Subscription();

	@ViewChild(ModalConfirmContactComponent, { static: false })
	modalComponent!: ModalConfirmContactComponent;

	constructor(
		private contactService: ContactService,
		private authService: AuthService,
	) {}

	formData: {
		Email: string;
		title: string;
		message: string;
	} = {
		Email: '',
		title: '',
		message: '',
	};

	ngOnInit(): void {
		this.connectedUser = this.authService.getConnectedUserData();
	}

	onSubmit(form: NgForm): void {
		this._subscription.add(
			this.contactService.postNewContact$(form.value).subscribe(() => {
				this.messageSent.emit(); // Emit event when message is sent
			}),
		);
	}

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
