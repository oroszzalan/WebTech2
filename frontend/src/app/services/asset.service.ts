import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssetService {
  constructor(private http: HttpClient) {}

  getAll(filters?: { search?: string; status?: string; category?: string }) {
    let params = new HttpParams();
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.category) params = params.set('category', filters.category);

    return this.http.get<any[]>(`${environment.apiUrl}/assets`, { params });
  }

  create(payload: any) {
    return this.http.post(`${environment.apiUrl}/assets`, payload);
  }

  update(id: string, payload: any) {
    return this.http.put(`${environment.apiUrl}/assets/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/assets/${id}`);
  }
}
