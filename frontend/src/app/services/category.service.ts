import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/categories`);
  }

  create(payload: any) {
    return this.http.post(`${environment.apiUrl}/categories`, payload);
  }

  update(id: string, payload: any) {
    return this.http.put(`${environment.apiUrl}/categories/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
