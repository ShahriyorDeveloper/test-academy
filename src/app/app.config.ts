import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  APP_INITIALIZER,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { importProvidersFrom } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { AuthService } from './shared/services/auth.service';
import { of } from 'rxjs';

function initializeApp(authService: AuthService) {
  return () => {
    const token = authService.getToken();
    if (token) {
      return authService.loadPermissions();
    }
    return of(null);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true,
    },
    provideCharts(withDefaultRegisterables()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' },
      },
    }),
  ],
};
