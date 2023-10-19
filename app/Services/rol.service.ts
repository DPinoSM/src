import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RolData {
  id_rol: number;
  numero_rol: number;
  nombre_rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private baseUrl = 'http://localhost:3001/api/roles';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de roles
  getRoles(): Observable<RolData[]> {
    return this.http.get<RolData[]>(`${this.baseUrl}/lista`);
  }

  // Método para crear un nuevo rol
  createRol(rolData: RolData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, rolData);
  }

  // Método para obtener un solo rol por su ID
  getRolById(id: number): Observable<RolData> {
    return this.http.get<RolData>(`${this.baseUrl}/${id}`);
  }

  // Método para actualizar un rol existente
  updateRol(id: number, rolData: RolData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, rolData);
  }

  // Método para eliminar un rol por su ID
  deleteRol(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
