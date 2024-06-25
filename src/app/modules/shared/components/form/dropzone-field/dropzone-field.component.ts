import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';

@Component({
	selector: 'app-dropzone-field',
	templateUrl: './dropzone-field.component.html',
	styleUrl: './dropzone-field.component.scss',
	providers: [MessageService],
})
export class DropzoneFieldComponent {
	uploadedFiles: File[] = [];

	constructor(private messageService: MessageService) {}

	onUpload(event: FileUploadEvent) {
		for (const file of event.files) {
			this.uploadedFiles.push(file);
		}

		this.messageService.add({
			severity: 'info',
			summary: 'File Uploaded',
			detail: '',
		});
	}
}
