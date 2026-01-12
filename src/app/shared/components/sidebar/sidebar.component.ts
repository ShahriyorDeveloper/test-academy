import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="h-screen flex flex-col justify-between bg-white border-r w-64 fixed left-0 top-0 overflow-y-auto z-10 hidden md:flex"
    >
      <div class="p-6">
        <h2
          class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Academy
        </h2>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <a
          routerLink="/structure"
          routerLinkActive="bg-blue-50 text-blue-600"
          class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <i class="pi pi-map text-lg"></i>
          <span class="font-medium">Tuzilma</span>
        </a>
        <a
          routerLink="/dashboard"
          routerLinkActive="bg-blue-50 text-blue-600"
          class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <i class="pi pi-chart-bar text-lg"></i>
          <span class="font-medium">KPI</span>
        </a>
      </nav>

      <div class="p-4 border-t">
        <button
          (click)="logout()"
          class="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <i class="pi pi-sign-out text-lg"></i>
          <span class="font-medium">Chiqish</span>
        </button>
      </div>
    </div>
  `,
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
