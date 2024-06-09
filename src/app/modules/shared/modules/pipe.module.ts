import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPipe } from '@shared/pipes/link.pipe';
import { ParagraphSplitPipe } from '@shared/pipes/paragraph-split.pipe';
import { AccountNavActiveLinkPipe } from '@shared/pipes/account-nav-active-link.pipe';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';
import { AdminNavActiveLinkPipe } from '@shared/pipes/admin-nav-active-link.pipe';

@NgModule({
	declarations: [
		LinkPipe,
		ParagraphSplitPipe,
		AccountNavActiveLinkPipe,
		AdminNavActiveLinkPipe,
		TruncatePipe,
	],
	imports: [CommonModule],
	exports: [
		LinkPipe,
		ParagraphSplitPipe,
		AccountNavActiveLinkPipe,
		AdminNavActiveLinkPipe,
		TruncatePipe,
	],
})
export class PipeModule {}
