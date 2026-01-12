import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem, SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MenuActionType, TableColumn, TableRow } from '../../type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    FormsModule,
    TableModule,
    SharedModule,
    NgxPermissionsModule,
  ],
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];
  @Input() showCustomRow = false;
  @Input() total = 0;
  @Input() rows = 0;
  @Input() totalRecords!: number;
  @Input() lazy = true;

  @Output() rowClick = new EventEmitter<TableRow>();
  @Output() pageChange = new EventEmitter<{ page: number; rows: number }>();
  @Output() myLazyLoad = new EventEmitter<TableLazyLoadEvent>();

  @Input() customRowTemplate: TemplateRef<TableRow> | null = null;
  @Output() action = new EventEmitter<{ row: TableRow; type: MenuActionType }>();

  @Output() menuAction = new EventEmitter<{ row: TableRow; type: MenuActionType }>();

  onPageChange(event: { first: number; rows: number; page: number }) {
    this.pageChange.emit({ page: event.page, rows: event.rows });
  }

  onRowClick(rowData: TableRow) {
    this.rowClick.emit(rowData);
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.rows);
  }

  rowMenuItems: MenuItem[] = [];
  selectedRow: TableRow | null = null;

  onMenuClick(event: Event, menu: Menu, row: TableRow) {
    this.selectedRow = row;
    this.rowMenuItems = [
      {
        label: 'Tahrirlash',
        icon: 'pi pi-pencil',
        command: () => this.menuAction.emit({ row, type: 'edit' }),
      },
      {
        label: 'O‘chirish',
        icon: 'pi pi-trash',
        command: () => this.menuAction.emit({ row, type: 'delete' }),
      },
      {
        label: 'Arxiv qilish',
        icon: 'pi pi-trash',
        command: () => this.menuAction.emit({ row, type: 'archive' }),
      },
    ];

    menu.toggle(event);
  }

  onAction(row: TableRow) {
    this.action.emit({ row, type: 'activity' });
  }
}
