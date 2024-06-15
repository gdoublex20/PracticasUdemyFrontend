import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private apiUrl = 'http://localhost:8080/users'; // URL de tu API Spring Boot

  constructor(private http: HttpClient) { }

  findByUsername(username: string): Observable<Usuario> {
    const url = `${this.apiUrl}/user/${username}`;
    
    const token = JSON.parse(localStorage.getItem('currentUser') || '{}')?.token;
    // Construye las cabeceras de la solicitud con el token JWT del localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realiza la solicitud GET al endpoint protegido con las cabeceras
    return this.http.get<Usuario>(url, { headers }).pipe(
      map((response: any) => response)
    );
  }
}
