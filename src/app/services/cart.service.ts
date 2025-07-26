import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = 'http://localhost:8081/cart';

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(
      `${this.url}/add?productId=${productId}&quantity=${quantity}`,
      {}
    );
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}`);
  }

  removeItem(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.url}/remove?productId=${productId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.url}/clear`);
  }
}
