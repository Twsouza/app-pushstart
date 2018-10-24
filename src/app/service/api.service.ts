import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://teste.pushstart.com.br/api/';

  constructor(
    private http: HttpClient,
    private route: Router) { }

  // check if user is logged in (if there's a token in the session)
  isAuthenticated(): boolean {
    // doesn't need to check type and value
    // tslint:disable-next-line:triple-equals
    return sessionStorage.getItem('token') != null;
  }

  // send a request to and, if successed, it'll return a token
  login(username: string, password: string) {
    return this.http.post(`${this.url}login`, {username: username, password: password});
  }

  // authenticate user, save the token in the session
  authUser(token: string) {
    sessionStorage.setItem('token', token);
    this.route.navigate(['/']);
  }

  get user(): string {
    return sessionStorage.getItem('token');
  }

  feedback(name: string, email: string, message: string) {
    return this.http.post(`${this.url}feedback`, {
      name: name,
      email: email,
      message: message
    });
  }
}
