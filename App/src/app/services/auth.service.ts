import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000'; 
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/api/auth/login`, loginData).pipe(
      tap((response: any) => this.setAuthToken(response.token))
    );
  }
  getAuthToken(): string | null {
    return this.authToken;
  }
  setAuthToken(token: string | null): void {
    this.authToken = token;
  }
}
