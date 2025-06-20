import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8081/products'; 
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> { //dentro ha la sincronizzazione con keycloack ricordare
    return this.http.get<User>(`${this.url}/me`);
  }


}
