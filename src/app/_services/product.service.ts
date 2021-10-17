import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderProductDetail, OrderProductRequest, Product } from '../_model/Product';
import { environment } from 'src/environments/environment';

const API_URL = environment.api.url + 'Products/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getValues(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(API_URL);
  }

  getProduct(id: number): Observable<Product>{
    return this.httpClient.get<Product>(API_URL + id);
  }

  getProductOrderHistory(productID: number): Observable<OrderProductDetail[]>{
    return this.httpClient.get<OrderProductDetail[]>(API_URL + 'GetOrderProductHistory?productID=' + productID);
  }

  orderProduct(request: OrderProductRequest): Observable<Product>{
    return this.httpClient.post<Product>(API_URL + 'OrderProduct', request, httpOptions);
  }
}
