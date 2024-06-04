import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ScrollService {
	scrollToElement(element: HTMLElement, duration: number): void {
		const startingY = window.scrollY;
		const elementY = window.scrollY + element.getBoundingClientRect().top;

		const diff = elementY - startingY;

		let start: number;

		const step = (timestamp: number) => {
			if (!start) start = timestamp;
			const time = timestamp - start;
			const percent = Math.min(time / duration, 1);

			window.scrollTo(0, startingY + diff * percent);

			if (time < duration) {
				window.requestAnimationFrame(step);
			}
		};

		window.requestAnimationFrame(step);
	}
}
