import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-dropzone-field',
	templateUrl: './dropzone-field.component.html',
	styleUrl: './dropzone-field.component.scss',
	providers: [MessageService],
})
export class DropzoneFieldComponent {
	uploadedFiles: any[] = [];

	constructor(private messageService: MessageService) {}

	onUpload(event: any) {
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
