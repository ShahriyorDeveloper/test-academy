import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MessageModule,
  ],
  template: `
    <div class="flex min-h-screen">
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div class="w-full max-w-md space-y-8">
          <div class="text-center">
            <img src="assets/images/logo.png" alt="Logo" class="h-16 mx-auto mb-4" *ngIf="false" />
            <h2 class="text-3xl font-bold text-gray-900">Tizimga kirish</h2>
            <p class="text-gray-500 mt-2">KPI tizimiga kirish</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
            <div class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
                  >Login</label
                >
                <input
                  id="email"
                  type="text"
                  pInputText
                  formControlName="email"
                  class="w-full p-inputtext-lg"
                  placeholder="Loginni kiritng"
                />
                <small
                  *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                  class="text-red-500 block mt-1"
                >
                  Login maydoni majburiy
                </small>
              </div>

              <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
                  >Parol</label
                >
                <p-password
                  id="password"
                  formControlName="password"
                  [feedback]="false"
                  [toggleMask]="true"
                  styleClass="w-full"
                  inputStyleClass="w-full p-inputtext-lg"
                  placeholder="Parolni kiriting"
                ></p-password>
                <small
                  *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                  class="text-red-500 block mt-1"
                >
                  Parol maydoni majburiy
                </small>
              </div>
            </div>

            <p-button
              label="Kirish"
              type="submit"
              [loading]="loading"
              styleClass="w-full mt-8 p-button-lg rounded-xl"
            ></p-button>
          </form>
        </div>
      </div>

      <div
        class="hidden lg:flex w-1/2 bg-blue-900 items-center justify-center relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-950 opacity-90"></div>
        <div class="relative z-10 text-center text-white p-12">
          <div class="mb-8">
            <i class="pi pi-shield text-9xl text-white/20"></i>
          </div>
          <h1 class="text-4xl font-bold mb-4">O'zbekiston Respublikasi</h1>
          <h2 class="text-2xl font-light opacity-80">Huquqni Muhofaza Qilish Akademiyasi</h2>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/structure']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loading = false;
      },
    });
  }
}
