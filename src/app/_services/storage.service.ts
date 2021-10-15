import { Injectable } from '@angular/core';
import { User } from '../_model/AuthenticationTypes';

const STORAGE_KEY = 'login-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  signOut(): void {
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
    }

    return {};
  }
}
