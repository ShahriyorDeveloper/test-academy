import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, FileUploadModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div
        class="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-gray-200"
      >
        <div class="flex items-center gap-3">
          <button
            pButton
            icon="pi pi-arrow-left"
            class="p-button-text p-button-rounded text-gray-600"
            (click)="goBack()"
          ></button>
          <h1 class="text-xl font-bold text-gray-800">Maqola qo'shish</h1>
        </div>
        <div class="flex gap-3">
          <button
            pButton
            label="Bekor qilish"
            class="p-button-outlined p-button-secondary rounded-lg"
            (click)="goBack()"
          ></button>
          <button
            pButton
            label="Qo'shish"
            icon="pi pi-plus"
            class="p-button-primary rounded-lg"
            (click)="onSubmit()"
          ></button>
        </div>
      </div>

      <div class="bg-white p-8 rounded-2xl border border-gray-200">
        <h2 class="text-lg font-bold mb-6 text-gray-800">Maqola haqida ma'lumot</h2>
        <form [formGroup]="form" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Maqola mavzusi</label>
            <input
              pInputText
              formControlName="topic"
              class="w-full bg-gray-50 border-gray-200 rounded-lg"
              placeholder="Mavzuni kiriting"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >E'lon qilingan jurnal</label
            >
            <input
              pInputText
              formControlName="journal"
              class="w-full bg-gray-50 border-gray-200 rounded-lg"
              placeholder="Jurnal nomini kiriting"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Maqola chiqarilgan sana</label
            >
            <input
              pInputText
              formControlName="date"
              class="w-full bg-gray-50 border-gray-200 rounded-lg"
              placeholder="Sanani tanlang"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Jurnal havolasi</label>
            <input
              pInputText
              formControlName="link"
              class="w-full bg-gray-50 border-gray-200 rounded-lg"
              placeholder="https://"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Maqola fayli</label>
            <div class="flex gap-2">
              <p-fileUpload
                mode="basic"
                chooseLabel="Tanlash"
                name="file"
                url="./upload"
                styleClass="bg-blue-600 text-white rounded-lg"
              ></p-fileUpload>
              <div
                class="flex-1 bg-gray-50 border border-gray-200 rounded-lg flex items-center px-3 text-gray-400 text-sm"
              >
                Maqola faylini yuklang
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ArticleCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      topic: ['', Validators.required],
      journal: ['', Validators.required],
      date: [null, Validators.required],
      link: [''],
      file: [null],
    });
  }

  goBack() {
    this.router.navigate(['/articles']);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Submitting:', this.form.value);
      this.goBack();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
