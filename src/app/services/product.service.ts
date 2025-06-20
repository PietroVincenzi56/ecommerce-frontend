import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url = 'http://localhost:8081/products'; 

  constructor(private http: HttpClient) {}

 getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/search/by_name?name=${name}`);
  }

  getProductsByPrice(price: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/search/by_prize?prize=${price}`);
  }

  getProductsByCode(code: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/search/by_code?code=${code}`);
  }

  getPagedProducts(pageNumber: number, pageSize: number, sortBy: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/paged?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`);
  }
  
  getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.url}/${id}`);
}
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.url, product);
  }
}
