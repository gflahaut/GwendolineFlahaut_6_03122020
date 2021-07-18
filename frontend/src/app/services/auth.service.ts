import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
const baseUrl = 'https://sopeckocko62.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string;
  private userId: string;
  constructor(private http: HttpClient,
    private router: Router) { }

  createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(baseUrl + 'api/auth/signup', { email: email, password: password }).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(baseUrl + '/api/auth/login', { email: email, password: password }).subscribe(
        (response: { userId: string, token: string }) => {
          this.userId = response.userId;
          this.authToken = response.token;
          this.isAuth$.next(true);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  logout() {
    this.authToken = null;
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}
