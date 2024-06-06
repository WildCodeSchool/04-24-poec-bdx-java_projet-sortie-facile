import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from '@activity/models/classes/activity.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AbstractModal } from '@shared/models/classes/components/absctract-modal.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
	selector: 'app-modal-confirm-creat-activity',
	templateUrl: './modal-confirm-creat-activity.component.html',
	styleUrl: './modal-confirm-creat-activity.component.scss',
	providers: [ConfirmationService, MessageService],
})
export class ModalConfirmCreatActivityComponent
	extends AbstractModal
	implements OnInit
{
	@Input() myForm!: NgForm;

	connectedUser!: AuthUserPrimaryDatas;
	uploadFirebaseImage!: string;

	constructor(
		private _confirmationService: ConfirmationService,
		private _messageService: MessageService,
		private _activityService: ActivityService,
		private _router: Router,
		private _authService: AuthService,
		private storage: AngularFireStorage,
	) {
		super();
	}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
	}

	public override onSubmit(img?: any) {
		console.log('ok', img);

		this._confirmationService.confirm({
			header: 'Confirmation',
			message: 'Confirmer la création de votre activité',
			accept: () => this.onAccept(img),
			reject: () => this.onReject(),
			acceptLabel: 'Oui',
			rejectLabel: 'Non',
		});
	}

	protected override onReject(): void {
		this._messageService.add({
			severity: 'error',
			summary: 'Abandonné',
			detail: 'Création abandonnée',
			life: 3000,
		});
	}

	protected override onAccept(selectedFile?: any): void {
		this.onUpload(selectedFile);
	}

	protected override onError() {
		this._messageService.add({
			severity: 'error',
			summary: 'Formulaire invalide',
			detail: 'Veuillez remplir les champs obligatoires',
			life: 3000,
		});
	}

	onUpload(selectedFile: any): void {
		if (selectedFile) {
			const filePath = `images/${selectedFile.name}`;
			const fileRef = this.storage.ref(filePath);
			const task = this.storage.upload(filePath, selectedFile);

			task
				.snapshotChanges()
				.pipe(
					finalize(() => {
						fileRef
							.getDownloadURL()
							.pipe(
								tap(url => {
									console.log('URL de téléchargement récupérée: ', url);
									this.uploadFirebaseImage = url;

									this.myForm.form.patchValue({
										imgUrl: this.uploadFirebaseImage,
									});

									console.log(this.myForm);

									// Continue with the activity creation process
									this._activityService
										.postNewActivity$({
											...this.myForm.value,
											userId: this.connectedUser.id,
											imageUrl: this.uploadFirebaseImage,
										})
										.pipe(
											tap((activity: Activity) => {
												this._messageService.add({
													severity: 'info',
													summary: 'Bravo',
													detail: 'Votre activité a bien été créée',
													life: 3000,
												});
												setTimeout(() => {
													this._router.navigate([
														FullActivityRouteEnum.DETAILS,
														activity.id,
													]);
												}, 3000);
											}),
											catchError(() => {
												this._messageService.add({
													severity: 'error',
													summary: 'Erreur',
													detail:
														"Une erreur s'est produite lors de la création de l'activité",
													life: 3000,
												});
												return of([]);
											}),
										)
										.subscribe();
								}),
							)
							.subscribe();
					}),
				)
				.subscribe();
		}
	}
}
