import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private baseUrl = 'http://localhost:8081/cart';

  constructor(private http: HttpClient) {}

    addToCart(productId: number, quantity: number): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(
      `${this.baseUrl}/add?productId=${productId}&quantity=${quantity}`,
      {}
    );
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}`);
  }

  removeItem(productId: number): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.baseUrl}/remove/${productId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clear`);
  }
}


