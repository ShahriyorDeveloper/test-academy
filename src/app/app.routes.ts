import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  template: `
    <div class="flex h-screen bg-gray-50">
      <app-sidebar></app-sidebar>
      <div class="flex-1 md:ml-64 overflow-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class MainLayoutComponent {}

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    data: {
      permissions: {
        only: ['COURSE_READ', 'USER_READ'],
        redirectTo: '/login',
      },
    },
    children: [
      { path: '', redirectTo: 'structure', pathMatch: 'full' },
      {
        path: 'structure',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['COURSE_READ', 'USER_READ'],
            redirectTo: '/login',
          },
        },
        loadComponent: () =>
          import('./components/structure-map/structure-map.component').then(
            (m) => m.StructureMapComponent
          ),
      },
      {
        path: 'dashboard',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['USER_READ'],
            redirectTo: '/structure',
          },
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
              ),
          },
          {
            path: 'articles',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./components/article-list/article-list.component').then(
                    (m) => m.ArticleListComponent
                  ),
              },
              {
                path: 'create',
                canActivate: [NgxPermissionsGuard],
                data: {
                  permissions: {
                    only: ['USER_READ'],
                    redirectTo: '/structure',
                  },
                },
                loadComponent: () =>
                  import('./components/article-create/article-create.component').then(
                    (m) => m.ArticleCreateComponent
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
