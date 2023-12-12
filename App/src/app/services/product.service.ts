import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/products.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products'; 

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) {}

  // Criar novo produto

  createProduct(product: Product): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/create`, product, { headers, responseType: 'text' });
  }

  // Buscar lista de produtos
  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
    return this.http.get<Product[]>(`${this.apiUrl}/list`,{ headers }).pipe(
      catchError((error) => {
        this.toastr.error('Error retrieving products', 'Error');
        throw error;
      })
    );
  }

  // Buscar produto por id
  getProductById(productId: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/create`, productId, { headers, responseType: 'text' });
  }

  // Atualizar produto
  updateProduct(productId: string, updatedProduct: Product): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.put(`${this.apiUrl}/update/${productId}`, updatedProduct, { headers, responseType: 'text' });
  }

  // Apagar produto
  deleteProduct(productId: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAuthToken()}`
    });
  
    return this.http.delete(`${this.apiUrl}/delete/${productId}`, { headers, responseType: 'text' });
  }
}
