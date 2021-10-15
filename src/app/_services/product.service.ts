import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderProductRequest, Product } from '../_model/Product';

const API_URL = 'https://localhost:44316/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getValues(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(API_URL + 'Products');
  }

  getProduct(id: number): Observable<Product>{
    return this.httpClient.get<Product>(API_URL + 'Products/' + id);
  }

  orderProduct(request: OrderProductRequest): Observable<Product>{
    return this.httpClient.post<Product>(API_URL + 'Products/OrderProduct', request, httpOptions);
  }
}
