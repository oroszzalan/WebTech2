import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly userKey = 'user';
  private readonly _isLoggedIn = signal(!!localStorage.getItem(this.tokenKey));
  private readonly _userName = signal(this.readUserName());

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, payload).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this._isLoggedIn.set(true);
        this._userName.set(response.user.name);
      })
    );
  }

  register(payload: { name: string; email: string; password: string }) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, payload).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this._isLoggedIn.set(true);
        this._userName.set(response.user.name);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this._isLoggedIn.set(false);
    this._userName.set('');
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return this._isLoggedIn();
  }

  userName() {
    return this._userName();
  }

  private readUserName() {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return '';
    try {
      return JSON.parse(raw).name || '';
    } catch {
      return '';
    }
  }
}
