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
          return this.checkToken(response.accessToken).pipe(
            map((user) => {
              if (user) {
                this.handleUserPermissions(user);
              }
              return response;
            })
          );
        }
        return of(response);
      })
    );
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  checkToken(token: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/check/token?token=${token}`);
  }

  loadPermissions(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    return this.checkToken(token).pipe(
      tap((user) => this.handleUserPermissions(user)),
      catchError((err) => {
        console.error('Failed to load user info', err);
        return of(null);
      })
    );
  }

  private handleUserPermissions(user: User) {
    console.log('User data loaded:', user);
    const permissions = user.permissions || [];
    const roles = user.roleName?.map((r) => r.roleName) || [];
    const allPermissions = [...permissions, ...roles];

    console.log('Loading permissions:', allPermissions);
    this.permissionsService.loadPermissions(allPermissions);
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
