import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8081/users'; 
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> { //dentro ha la sincronizzazione con keycloack ricordare
    return this.http.get<User>(`${this.url}/me`);
  }

  rechargeBalance(userId: number, amount: number): Observable<User> {
  return this.http.post<User>(`${this.url}/${userId}/recharge`, amount);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

}



