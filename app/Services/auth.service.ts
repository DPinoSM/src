import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LoginResponse {
  msg: string;
  token?: string;
  role?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/users/login';
  private authToken: string | null = null;
  private userRole: number | null = null;

  constructor(private http: HttpClient) {}

  login(rut: string, password: string): Observable<LoginResponse> {
    const loginData = { rut_usuario: rut, clave_usuario: password };
    return this.http.post<LoginResponse>(`${this.apiUrl}`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error de inicio de sesión';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 200) {
      // Error de autenticación
      errorMessage = 'Usuario o contraseña incorrectos';
    }

    return throwError(() => errorMessage);
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  getUserRole(): number | null {
    return this.userRole;
  }

  clearAuthData() {
    this.authToken = null;
    this.userRole = null;
  }
}
