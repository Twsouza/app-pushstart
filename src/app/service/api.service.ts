import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://teste.pushstart.com.br/api/';


  constructor(
    private http: HttpClient,
    private route: Router) { }

  isAuthenticated(): boolean {
    // doesn't need to check type and value
    // tslint:disable-next-line:triple-equals
    return sessionStorage.getItem('token') != null;
  }

  login(username: string, password: string) {
    return this.http.post(`${this.url}login`, {username: username, password: password});
  }

  authUser(token: string) {
    sessionStorage.setItem('token', token);
    this.route.navigate(['/']);
  }
}
