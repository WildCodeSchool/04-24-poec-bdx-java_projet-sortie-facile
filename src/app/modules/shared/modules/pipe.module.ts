import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPipe } from '@shared/pipes/link.pipe';
import { ParagraphSplitPipe } from '@shared/pipes/paragraph-split.pipe';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';
import { ConnectedNavActiveLinkPipe } from '@shared/pipes/connected-nav-active-link.pipe';

@NgModule({
	declarations: [
		LinkPipe,
		ParagraphSplitPipe,
		ConnectedNavActiveLinkPipe,
		TruncatePipe,
	],
	imports: [CommonModule],
	exports: [
		LinkPipe,
		ParagraphSplitPipe,
		ConnectedNavActiveLinkPipe,
		TruncatePipe,
	],
})
export class PipeModule {}
