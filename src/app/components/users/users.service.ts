import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {environment} from "../../enviroment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Método para login y guardar el token
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (this.isBrowser()) {
          // Guardamos el token en localStorage solo si estamos en el navegador
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // Método para obtener usuarios desde el backend
  getUsers(): Observable<any[]> {
    let token: string | null = null;

    if (this.isBrowser()) {
      token = localStorage.getItem('token');  // Obtiene el token solo si estamos en el navegador
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }

// Método para obtener un usuario por su ID
  getUserDetails(userId: number): Observable<any> {
    let token: string | null = null;

    if (this.isBrowser()) {
      token = localStorage.getItem('token');  // Obtiene el token solo si estamos en el navegador
    }

    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Aquí construimos la URL correctamente con el ID
    return this.http.get<any>(`${this.apiUrl}/select/${userId}`, { headers });
  }

  // Método para verificar si estamos en el navegador o no
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
