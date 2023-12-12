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

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.get<User[]>(`${this.apiUrl}/list`, { headers });
  }

  getUserById(userId: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.get<User>(`${this.apiUrl}/get/${userId}`, { headers });
  }

  createUser(user: User): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/create`, user, { headers, responseType: 'text' });
  }

  updateUser(userId: string, user: User): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.put(`${this.apiUrl}/update/${userId}`, user, { headers, responseType: 'text' });
  }
  deleteUser(userId: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
  
    return this.http.delete(`${this.apiUrl}/delete/${userId}`, { headers, responseType: 'text' });
  }
}
