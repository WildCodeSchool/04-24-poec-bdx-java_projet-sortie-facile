import {
	Component,
	EventEmitter,
	Input,
	Output,
	forwardRef,
} from '@angular/core';
import { Observable, delay, finalize, tap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormInputControlValueAccessor } from '@shared/models/classes/utils/form-input-control-value-accessor.class';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgForm,
} from '@angular/forms';
import { UploadFileService } from '@shared/services/upload-file.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrl: './file-upload.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FileUploadComponent),
			multi: true,
		},
	],
})
export class FileUploadComponent implements ControlValueAccessor {
	@Input() id!: string;
	@Input() name!: string;
	@Input() form!: NgForm;

	imgUrl: string | null = null;
	onChange: any = () => {};
	onTouched: any = () => {};

	// selectedFile: File | null = null;
	@Output() selectedFile = new EventEmitter<File>();
	downloadURL: Observable<string> | null = null;

	constructor(
		private storage: AngularFireStorage,
		private _ploadFileService: UploadFileService,
	) {}

	writeValue(value: any): void {
		this.imgUrl = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		// Implement if needed
	}

	onFileSelected(event: any): void {
		const file = event.target.files[0];

		if (file) {
			console.log(file);

			this._ploadFileService.setSelectedFile(file);
		}
	}

	// onFileSelected(event: any): void {
	// 	const file = event.target.files[0];
	// 	if (file) {
	// 		this.selectedFile = file;
	// 		console.log(this.selectedFile);
	// 	}
	// }

	onUpload(): void {
		if (this.selectedFile) {
			const filePath = `images/${this.selectedFile.name}`;
			const fileRef = this.storage.ref(filePath);
			const task = this.storage.upload(filePath, this.selectedFile);

			task
				.snapshotChanges()
				.pipe(
					finalize(() => {
						this.downloadURL = fileRef.getDownloadURL();
					}),
					tap(fileRef => {
						console.log(fileRef);
					}),
				)
				.subscribe();
		}
	}
}
