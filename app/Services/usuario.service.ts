import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3001/api/users';

  constructor(private http: HttpClient) {}

  // Función para crear un usuario
  createUser(usuarioData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, usuarioData);
  }

  // Función para obtener la lista de usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lista`);
  }

  // Función para actualizar un usuario
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, userData);
  }

  // Función para eliminar un usuario
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Función para obtener un usuario por ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}


