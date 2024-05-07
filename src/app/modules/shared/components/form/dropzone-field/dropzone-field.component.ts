import { Component } from '@angular/core';

@Component({
  selector: 'app-dropzone-field',
  templateUrl: './dropzone-field.component.html',
  styleUrl: './dropzone-field.component.scss'
})
export class DropzoneFieldComponent {

onUpload($event: Event) {
  throw new Error('Method not implemented.');
}

}
