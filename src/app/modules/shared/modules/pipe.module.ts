import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPipe } from '@shared/pipes/link.pipe';
import { ParagraphSplitPipe } from '@shared/pipes/paragraph-split.pipe';
import { AccountNavActiveLinkPipe } from '@shared/pipes/account-nav-active-link.pipe';

@NgModule({
	declarations: [LinkPipe, ParagraphSplitPipe, AccountNavActiveLinkPipe],
	imports: [CommonModule],
	exports: [LinkPipe, ParagraphSplitPipe, AccountNavActiveLinkPipe],
})
export class PipeModule {}
