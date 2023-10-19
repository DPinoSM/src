import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RolData {
  id_rol?: number;
  nombre_rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private baseUrl = 'http://localhost:3001/api/roles';

  constructor(private http: HttpClient) {}

  // Métodos para obtener, crear, actualizar y eliminar roles
  getRoles(): Observable<RolData[]> {
    return this.http.get<RolData[]>(`${this.baseUrl}/lista`);
  }

  createRol(rolData: RolData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, rolData);
  }

  getRolById(id: number): Observable<RolData> {
    return this.http.get<RolData>(`${this.baseUrl}/${id}`);
  }

  updateRol(id: number, rolData: RolData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, rolData);
  }

  deleteRol(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
