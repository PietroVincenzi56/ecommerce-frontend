import { User } from './user.model';
import { Product } from './product.model';

export interface ProductOrder {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id?: number; 
  time?: string; 
  buyer: User;
  productOrders: ProductOrder[];
}