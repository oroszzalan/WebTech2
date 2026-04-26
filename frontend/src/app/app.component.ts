import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div *ngIf="isLoggedIn()" class="navbar">
      <div class="container flex justify-between">
        <div>
          <a routerLink="/">Eszközök</a>
          <a routerLink="/categories">Kategóriák</a>
          <a routerLink="/assignments">Kiadások</a>
        </div>
        <div class="flex">
          <span>{{ auth.userName() }}</span>
          <button style="width:auto" class="secondary" (click)="logout()">Kilépés</button>
        </div>
      </div>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = computed(() => this.auth.isLoggedIn());

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
