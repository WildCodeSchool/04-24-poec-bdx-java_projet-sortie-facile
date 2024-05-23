import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
	name: 'paragraphSplit',
})
export class ParagraphSplitPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	transform(value: string): SafeHtml {
		if (!value) {
			return '';
		}

		const paragraphsSplit = value.split('  ');
		const paragraphElements = paragraphsSplit
			.map(paragraph => `<p>${paragraph}</p>`)
			.join('');

		return this.sanitizer.bypassSecurityTrustHtml(paragraphElements);
	}
}