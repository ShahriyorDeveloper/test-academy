import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="space-y-8">
        <section>
          <h2 class="text-lg font-bold text-gray-800 mb-4">O'quv-pedagogik faoliyat</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              *ngFor="let i of [1, 2, 3, 4]"
              class="bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-blue-200 cursor-pointer transition-all"
              (click)="goToArticles()"
            >
              <div class="flex justify-between items-start mb-2">
                <div
                  class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"
                >
                  <i class="pi pi-book text-xl"></i>
                </div>
                <div class="text-xl font-bold text-gray-800">
                  0 <span class="text-sm text-green-500 font-normal">+0</span>
                </div>
              </div>
              <p class="text-xs text-gray-500 line-clamp-2">
                Me'yordan ortiq, auditoriya mashg'ulotlari
              </p>
              <div class="mt-2 flex justify-end">
                <i class="pi pi-chevron-right text-xs text-gray-400"></i>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-bold text-gray-800 mb-4">Ilmiy faoliyat</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              *ngFor="let i of [1, 2, 3, 4]"
              class="bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-blue-200 cursor-pointer transition-all"
              (click)="goToArticles()"
            >
              <div class="flex justify-between items-start mb-2">
                <div
                  class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"
                >
                  <i class="pi pi-bookmark text-xl"></i>
                </div>
                <div class="text-xl font-bold text-gray-800">
                  0 <span class="text-sm text-green-500 font-normal">+0</span>
                </div>
              </div>
              <p class="text-xs text-gray-500 line-clamp-2">Boshqa ilmiy ishlar</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goToArticles() {
    this.router.navigate(['/articles']);
  }
}
