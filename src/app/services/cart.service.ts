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
  private url = 'http://localhost:8081/cart';

  constructor(private http: HttpClient) {}

    addToCart(productId: number, quantity: number): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(
      `${this.url}/add?productId=${productId}&quantity=${quantity}`,
      {}
    );
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.url}`);
  }

  removeItem(productId: number): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.url}/remove/${productId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.url}/clear`);
  }
}


