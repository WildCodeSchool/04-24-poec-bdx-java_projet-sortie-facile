import {
	Component,
	EventEmitter,
	Input,
	Output,
	forwardRef,
} from '@angular/core';
import { Observable } from 'rxjs';
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
	onChanged!: (value: string) => void;
	onTouched!: () => void;

	@Output() selectedFile = new EventEmitter<File>();
	downloadURL: Observable<string> | null = null;

	constructor(private _uploadFileService: UploadFileService) {}

	writeValue(value: string): void {
		this.imgUrl = value;
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChanged = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	onFileSelected(event: any): void {
		const file = event.target.files[0];

		if (file) {
			this._uploadFileService.setSelectedFile(file);
		}
	}
}
