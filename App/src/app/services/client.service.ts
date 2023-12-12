import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { Client } from '../models/clients.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:5000/api/clients'; 

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) {}

  // Criar novo cliente
  createClient(client: Client): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/create`, client, { headers, responseType: 'text' });
  }

  // Buscar lista de clientes
  getAllClients(): Observable<Client[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.get<Client[]>(`${this.apiUrl}/list`, { headers }).pipe(
      catchError((error) => {
        this.toastr.error('Error retrieving clients', 'Error');
        throw error;
      })
    );
  }

  // Buscar client por id
  getClientById(clientId: string): Observable<Client> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
    });
    return this.http.get<Client>(`${this.apiUrl}/get/${clientId}`, { headers }).pipe(
      catchError((error) => {
        this.toastr.error('Error retrieving client by ID', 'Error');
        throw error;
      })
    );
  }

  // Atualizar cliente
  updateClient(clientId: string, updatedClient: Client): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.put(`${this.apiUrl}/update/${clientId}`, updatedClient, { headers, responseType: 'text' });
  }

  // Apagar cliente
  deleteClient(clientId: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.delete(`${this.apiUrl}/delete/${clientId}`, { headers, responseType: 'text' });
  }
}
