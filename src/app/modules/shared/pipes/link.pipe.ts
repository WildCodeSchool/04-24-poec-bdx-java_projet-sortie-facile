import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'link',
})
export class LinkPipe implements PipeTransform {
	transform(value: string): string {
		if (!/^https?:\/\//i.test(value)) {
			return 'http://' + value;
		}

		return value;
	}
}
