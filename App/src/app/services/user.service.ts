import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}

  //Buscar listade  utilizadores
  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.get<User[]>(`${this.apiUrl}/list`, { headers });
  }
  //Buscar utilizador por id
  getUserById(userId: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.get<User>(`${this.apiUrl}/get/${userId}`, { headers });
  }

  //Criar utilizador
  createUser(user: User): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/create`, user, { headers, responseType: 'text' });
  }

  //Atualizar utilizador
  updateUser(userId: string, user: User): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.put(`${this.apiUrl}/update/${userId}`, user, { headers, responseType: 'text' });
  }

  //Apagar utilizador
  deleteUser(userId: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
  
    return this.http.delete(`${this.apiUrl}/delete/${userId}`, { headers, responseType: 'text' });
  }
}
