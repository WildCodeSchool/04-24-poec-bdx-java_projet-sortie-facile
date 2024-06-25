export class CarouselResponsiveOption {
	breakpoint: string;
	numVisible: number;
	numScroll: number;

	constructor(breakpoint: string, numVisible: number, numScroll: number) {
		this.breakpoint = breakpoint;
		this.numVisible = numVisible;
		this.numScroll = numScroll;
	}
}
