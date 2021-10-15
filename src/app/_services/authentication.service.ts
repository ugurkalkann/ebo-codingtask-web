import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, User } from '../_model/AuthenticationTypes';

const API_URL = 'https://localhost:44316/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  login(userInfo: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(API_URL + 'Login', userInfo, httpOptions);
  }
}
