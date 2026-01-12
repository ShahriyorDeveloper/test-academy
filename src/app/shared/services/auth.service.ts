import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of, map, switchMap } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoginRequest, LoginResponse, User } from '../type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://profe.proacademy.uz/profe/api/v1';

  constructor(
    private http: HttpClient,
    private router: Router,
    private permissionsService: NgxPermissionsService
  ) {}

  login(payload: LoginRequest): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload).pipe(
      switchMap((response) => {
        if (response && response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          return this.loadPermissions().pipe(map(() => response));
        }
        return of(response);
      })
    );
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  loadPermissions(): Observable<User | null> {
    return this.getMe().pipe(
      tap((user) => {
        console.log('User data loaded:', user);

        const roles = user.roleName?.map((r) => r.roleName) || [];

        console.log('Loading permissions:', roles);
        this.permissionsService.loadPermissions(roles.length ? roles : ['ROLE_LISTENER']);
      }),
      catchError((err) => {
        console.error('Failed to load user info', err);
        this.permissionsService.loadPermissions(['GUEST']);
        return of(null);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.permissionsService.flushPermissions();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
