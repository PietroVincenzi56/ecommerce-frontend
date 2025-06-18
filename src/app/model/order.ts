import { Product } from './Product';

export interface Order {
  id: number;
  time: string;
  productOrders: {
    product: Product;
    quantity: number;
    priceAtPurchase: number;
  }[];
}