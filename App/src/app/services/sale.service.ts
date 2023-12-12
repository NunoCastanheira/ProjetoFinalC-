import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { Sale } from '../models/sales.model';


@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private apiUrl = 'http://localhost:5000/api/sales';

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) {}

  // Criar novo sale
  createSale(sale: Sale): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/create`, sale, { headers, responseType: 'text' });
  }

  // Buscar lista de sales
  getAllSales(): Observable<Sale[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.get<Sale[]>(`${this.apiUrl}/list`, { headers }).pipe(
      catchError((error) => {
        this.toastr.error('Error retrieving sales', 'Error');
        throw error;
      })
    );
  }

  // Buscar sale por id
  getSaleById(saleId: string): Observable<Sale> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
    });
    return this.http.get<Sale>(`${this.apiUrl}/get/${saleId}`, { headers }).pipe(
      catchError((error) => {
        this.toastr.error('Error retrieving sale by ID', 'Error');
        throw error;
      })
    );
  }

  // Autualizar sale
  updateSale(saleId: string, updatedSale: Sale): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.put(`${this.apiUrl}/update/${saleId}`, updatedSale, { headers, responseType: 'text' });
  }

  // Apagar sale
  deleteSale(saleId: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });

    return this.http.delete(`${this.apiUrl}/delete/${saleId}`, { headers, responseType: 'text' });
  }
}
