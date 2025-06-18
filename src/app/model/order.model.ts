import { Product } from './product.model';

export interface Order {
  id: number;
  time: string;
  productOrders: {
    product: Product;
    quantity: number;
    priceAtPurchase: number;
  }[];
}