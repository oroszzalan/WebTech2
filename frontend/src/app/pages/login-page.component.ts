import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container" style="max-width: 500px; margin-top: 60px;">
      <div class="card">
        <h1>Bejelentkezés</h1>
        <p>Alap seed felhasználó: <strong>admin@admin.hu</strong> / <strong>admin123</strong></p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>Email</label>
          <input type="email" formControlName="email" />

          <label>Jelszó</label>
          <input type="password" formControlName="password" />

          <div class="error" *ngIf="error">{{ error }}</div>
          <button type="submit">Belépés</button>
        </form>
      </div>
    </div>
  `
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';

  form = this.fb.nonNullable.group({
    email: ['admin@admin.hu', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required, Validators.minLength(6)]]
  });

  submit() {
    if (this.form.invalid) return;
    this.error = '';

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => (this.error = err.error?.message || 'Sikertelen bejelentkezés')
    });
  }
}
