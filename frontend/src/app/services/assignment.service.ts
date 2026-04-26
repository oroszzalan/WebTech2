import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/assignments`);
  }

  create(payload: any) {
    return this.http.post(`${environment.apiUrl}/assignments`, payload);
  }

  returnItem(id: string) {
    return this.http.put(`${environment.apiUrl}/assignments/${id}/return`, {});
  }
}
