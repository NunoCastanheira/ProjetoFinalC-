import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/products.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/product'; // Adjust the URL to match your backend API

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // Create a new product
  createProduct(product: Product): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<string>(`${this.apiUrl}/create`, product, { headers }).pipe(
      map((res: string) => {
        this.toastr.success(res, 'Create Success');
        return res;
      }),
      catchError((error) => {
        this.toastr.error('Error creating product', 'Create Error');
        throw error;
      })
    );
  }

  // Get the list of all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/list`).pipe(
      catchError((error) => {
        this.toastr.error('Error retrieving products', 'Error');
        throw error;
      })
    );
  }

  // Get a product by ID
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/get/${productId}`).pipe(
      catchError((error) => {
        this.toastr.error('Error retrieving product by ID', 'Error');
        throw error;
      })
    );
  }

  // Update a product
  updateProduct(productId: string, updatedProduct: Product): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<string>(`${this.apiUrl}/update/${productId}`, updatedProduct, { headers }).pipe(
      map((res: string) => {
        this.toastr.success(res, 'Update Success');
        return res;
      }),
      catchError((error) => {
        this.toastr.error('Error updating product', 'Update Error');
        throw error;
      })
    );
  }

  // Delete a product
  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${productId}`).pipe(
      map((res: string) => {
        this.toastr.success(res, 'Delete Success');
        return res;
      }),
      catchError((error) => {
        this.toastr.error('Error deleting product', 'Delete Error');
        throw error;
      })
    );
  }
}
