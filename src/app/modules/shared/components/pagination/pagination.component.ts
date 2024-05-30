import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationOption } from '@shared/models/types/utils/pagination.type';
import { LazyLoadEvent } from 'primeng/api';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
	@Input() rows: number = 8;
	@Input() first: number = 0;
	@Input() totalRecords: number = 0;
	@Input() rowsPerPageOptions!: PaginationOption[];
	@Output() pageChange: EventEmitter<LazyLoadEvent> = new EventEmitter();
	@Output() rowsChange: EventEmitter<number> = new EventEmitter();

	onPageChange(event: LazyLoadEvent): void {
		this.pageChange.emit(event);
	}

	onRowsChange(event: number): void {
		this.rowsChange.emit(event);
	}
}
