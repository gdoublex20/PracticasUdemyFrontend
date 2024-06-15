import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'; // URL de tu API Spring Boot

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap(response => {
        // login exitoso si hay un token JWT en la respuesta
        if (response && response.token) {
          // almacena los detalles de usuario y token JWT en el almacenamiento local
          localStorage.setItem('currentUser', JSON.stringify({ username, token: response.token }));
        }
      }));
  }
}
