import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users'; 

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  findAllUsers(): Observable<Usuario[]> {
    const url = `${this.apiUrl}`;
    
    const token = JSON.parse(localStorage.getItem('currentUser') || '{}')?.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(url, { headers }).pipe(
      map((response: any[]) => {
        return response.map(item => ({
          id: item.id,
          name: item.name,
          lastname: item.lastname,
          username: item.username,
          email: item.email,
          password: item.password,
          creationDate: item.creationDate ? this.formatDate(item.creationDate) : null,
          lastDate: item.lastDate ? this.formatDate(item.lastDate) : null,
          avatar: item.avatar,
          role: item.role
        })) as Usuario[];
      })
    );
  }

  formatDate(dateStr: string | null): string {
    if (!dateStr) {
      return ''; 
    }
    const date = new Date(dateStr);
    return this.datePipe.transform(date, "yyyy-MM-dd'T'HH:mm") || '';
  }

  findByUsername(username: string): Observable<Usuario> {
    const url = `${this.apiUrl}/user/${username}`;
    
    const token = JSON.parse(localStorage.getItem('currentUser') || '{}')?.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Usuario>(url, { headers }).pipe(
      map((response: any) => response)
    );
  }

  findById(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    
    const token = JSON.parse(localStorage.getItem('currentUser') || '{}')?.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Usuario>(url, { headers }).pipe(
      map((response: any) => response)
    );
  }

    createUser(user: any): Observable<Usuario>{
      const url = `${this.apiUrl}/create`;
      const token = JSON.parse(localStorage.getItem('currentUser') || '{}')?.token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Formatear las fechas
    user.creationDate = this.formatDate(user.creationDate);
    user.lastDate = this.formatDate(user.lastDate);
      return this.http.post<Usuario>(url ,user ,{ headers }).pipe(
        map((response: any) => response)
      );
    }

    updateUser(user: any, id: number| undefined): Observable<Usuario>{
      const url = `${this.apiUrl}/update/${id}`;
      const token = JSON.parse(localStorage.getItem('currentUser') || '{}')?.token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      user.creationDate = this.formatDate(user.creationDate);
      user.lastDate = this.formatDate(user.lastDate);
      return this.http.put<Usuario>(url ,user ,{ headers }).pipe(
        map((response: any) => response)
      );
    }

    deleteUser(usuarioId: any): Observable<Usuario>{
      const url = `${this.apiUrl}/delete/${usuarioId}`;
      const token = JSON.parse(localStorage.getItem('currentUser') || '{}')?.token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.delete<Usuario>(url, { headers }).pipe(
        tap((response: any) => response)
      );
    }

}
