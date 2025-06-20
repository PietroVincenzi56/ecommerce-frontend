import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private items: CartItem[] = [];
  
  constructor() { }
}
