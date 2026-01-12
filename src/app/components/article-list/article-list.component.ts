import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { NgxPermissionsService } from 'ngx-permissions';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';

import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { MenuActionType, TableColumn, TableRow } from '../../shared/type';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    SharedModule,
    InputTextModule,
  ],
  providers: [ConfirmationService],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <button
            pButton
            icon="pi pi-arrow-left"
            class="p-button-text p-button-rounded text-gray-600"
            (click)="goBack()"
          ></button>
          <h1 class="text-2xl font-bold text-gray-800">Xalqaro jurnal maqolasi (chet tilida)</h1>
        </div>
        <button
          pButton
          label="Qo'shish"
          icon="pi pi-plus"
          class="p-button-primary rounded-xl"
          (click)="goToCreate()"
        ></button>
      </div>

      <app-table
        [columns]="columns"
        [data]="data"
        [total]="data.length"
        [rows]="10"
        (action)="handleAction($event)"
        (menuAction)="handleMenuAction($event)"
      ></app-table>

      <p-confirmDialog [style]="{ width: '450px' }"></p-confirmDialog>

      <p-dialog
        [(visible)]="displayEditDialog"
        [style]="{ width: '500px' }"
        header="Tahrirlash"
        [modal]="true"
        styleClass="p-fluid"
      >
        <div class="field">
          <label for="topic">Maqola mavzusi</label>
          <input
            type="text"
            pInputText
            id="topic"
            [(ngModel)]="selectedArticle['topic']"
            class="w-full p-2 border rounded"
            *ngIf="selectedArticle"
          />
        </div>

        <button
          pButton
          label="Bekor qilish"
          icon="pi pi-times"
          class="p-button-text"
          (click)="hideDialog()"
        ></button>
        <button
          pButton
          label="Saqlash"
          icon="pi pi-check"
          class="p-button-text"
          (click)="saveArticle()"
        ></button>
      </p-dialog>
    </div>
  `,
})
export class ArticleListComponent implements OnInit {
  columns: TableColumn[] = [];
  data: TableRow[] = [];
  displayEditDialog = false;
  selectedArticle: Partial<TableRow> = {};

  constructor(
    private router: Router,
    private permissionsService: NgxPermissionsService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.initColumns();
    this.data = [
      {
        id: 1,
        topic: 'Comparative analysis of community policing...',
        journal: 'Policing: An International Journal',
        file: 'Maqola.pdf',
        link: 'https://example.com',
        status: 'PENDING',
        actions: true,
      },
      {
        id: 2,
        topic: 'Impact of technology on urban safety...',
        journal: 'Journal of Urban Affairs',
        file: 'TechUrbanSafety.pdf',
        link: '#',
        status: 'APPROVED',
        actions: true,
      },
      {
        id: 3,
        topic: 'Evaluating the effectiveness...',
        journal: 'Crime Prevention Studies',
        file: 'NeighborhoodWs.pdf',
        link: '#',
        status: 'REJECTED',
        actions: true,
      },
    ];
  }

  initColumns() {
    this.columns = [
      { field: 'id', header: '№' },
      { field: 'topic', header: 'Maqola mavzusi' },
      { field: 'journal', header: 'Chop etilgan jurnal nomi' },
      { field: 'file', header: 'Maqola fayli', type: 'file' },
      { field: 'link', header: 'Jurnal havolasi', type: 'link' },
      { field: 'status', header: 'Status', type: 'status' },
    ];

    this.permissionsService
      .hasPermission(['PERMISSION_EDIT', 'PERMISSION_DELETE'])
      .then((hasPermission) => {
        if (hasPermission) {
          this.columns.push({ field: 'actions', header: 'Amallar', type: 'actions' });
        }
      });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  goToCreate() {
    this.router.navigate(['/dashboard/articles/create']);
  }

  handleAction(event: { row: TableRow; type: MenuActionType }) {
    console.log('Action:', event);
  }

  handleMenuAction(event: { row: TableRow; type: MenuActionType }) {
    const { row, type } = event;
    if (type === 'delete') {
      this.confirmationService.confirm({
        message: "Haqiqatan ham o'chirmoqchimisiz?",
        header: 'Tasdiqlash',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ha',
        rejectLabel: "Yo'q",
        accept: () => {
          this.data = this.data.filter((val) => val.id !== row.id);
          console.log('Deleted');
        },
      });
    } else if (type === 'edit') {
      this.selectedArticle = { ...row };
      this.displayEditDialog = true;
    }
  }

  hideDialog() {
    this.displayEditDialog = false;
  }

  saveArticle() {
    const index = this.data.findIndex((d) => d.id === this.selectedArticle.id);
    if (index > -1) {
      this.data[index] = this.selectedArticle;
    }
    this.displayEditDialog = false;
  }
}
