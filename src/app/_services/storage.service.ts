import { Injectable } from '@angular/core';
import { User } from '../_model/AuthenticationTypes';

const STORAGE_KEY = 'login-user-key';
const AUTH_TOKEN_KEY = 'auth-token-key';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  logOut(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(STORAGE_KEY);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    const user = window.sessionStorage.getItem(STORAGE_KEY);
    if (user) {
      return JSON.parse(user);
    }else{
      return {};
    }
  }

  public saveAuthToken(token: string): void {
    window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  public getAuthToken(): string | null {
    return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
  }
}
