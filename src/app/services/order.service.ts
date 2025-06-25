import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.model';  
import { User } from '../model/user.model';    


@Injectable({
  providedIn: 'root'
})

export class OrderService {  
  private url = 'http://localhost:8081/orders';

  constructor(private http: HttpClient) {}
  
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }
  
  getOrdersByUser(user: User): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/${user.id}`);
  }

  getOrdersByUserInPeriod(userId: number, startDate: string, endDate: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/${userId}/${startDate}/${endDate}`);
  }
}

